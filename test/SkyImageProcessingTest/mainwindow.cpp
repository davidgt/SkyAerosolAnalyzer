#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QDir>
#include <QMessageBox>
#include <QThread>


MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    initComponents();

    //m_timer = new QTimer(this);
    //connect (m_timer,SIGNAL(timeout()),this,SLOT(processFrameAndUpdateUI()));
    //m_timer->start(1000);
    processFrameAndUpdateUI();
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::initComponents()
{
    fillPhotoList();
    m_currentPhotoIndex = 0;
}

void MainWindow::fillPhotoList()
{
    QStringList filtro("*.jpg");
    QString directorioString = "photos";
    QDir directory(directorioString);
    m_photoList = directory.entryList(filtro);
    if(m_photoList.isEmpty())
        QMessageBox::critical(this,"No Images","No images found /photos");
}

void MainWindow::processFrameAndUpdateUI()
{
    m_img = cvLoadImage(QString("photos/%1").arg(m_photoList.at(m_currentPhotoIndex)).toUtf8());

    cv::Mat matOriginalTemp(m_img);
    cv::resize(matOriginalTemp,matOriginalTemp,cv::Size(800,600),0,0,cv::INTER_LINEAR);
    matOriginalTemp.copyTo(m_matOriginal);
    cv::cvtColor(m_matOriginal,m_matOriginal,cv::COLOR_BGR2RGB);

    cv::Mat matHSV;
    cv::cvtColor(matOriginalTemp,matHSV,cv::COLOR_BGR2HSV_FULL);

    cv::Mat matThreshold;
    cv::inRange(matHSV, cv::Scalar(ui->sb_hMin->value(),ui->sb_sMin->value(),ui->sb_vMin->value())
                ,cv::Scalar(ui->sb_hMax->value(),ui->sb_sMax->value(),ui->sb_vMax->value()),matThreshold);

    cv::Mat matProcessed;
    m_matOriginal.copyTo(matProcessed);
    int processedPixels = 0;
    matProcessed = Overlap(matProcessed,matThreshold,&processedPixels);
    int goodPixels = (matThreshold.cols*matThreshold.rows) - processedPixels ;
    double percent = ((double)goodPixels*100.0)/(double)(matThreshold.cols*matThreshold.rows);

    ui->l_skyPercent->setText(QString("%1 %").arg(QString::number(percent,'f',2)));

    cv::Mat matProcessedHSV;

    cv::cvtColor(matProcessed,matProcessedHSV,cv::COLOR_RGB2HSV_FULL);

    int saturationMed = 0;
    ui->l_skyColor->setText(QString::number(ColorMed(matProcessedHSV,&saturationMed)));
    ui->l_saturation->setText(QString::number(saturationMed));

    //cv::resize(m_matOriginal,m_matOriginal,cv::Size(800,600),0,0,cv::INTER_LINEAR);
    //cv::resize(matThreshold,matThreshold,cv::Size(800,600),0,0,cv::INTER_LINEAR);
    //cv::resize(matProcessed,matProcessed,cv::Size(800,600),0,0,cv::INTER_LINEAR);
    cv::putText(matProcessed,"visible sky:" + ui->l_skyPercent->text().toStdString()
                ,cv::Point(0,25),1,1.7,cv::Scalar(255,255,20),1);
    cv::putText(matProcessed,"Color med:" +ui->l_skyColor->text().toStdString()
                ,cv::Point(0,50),1,1.7,cv::Scalar(255,255,20),1);
    cv::putText(matProcessed,"Sat med:" +ui->l_saturation->text().toStdString()
                ,cv::Point(0,75),1,1.7,cv::Scalar(255,255,20),1);


    QImage qimgOriginal((uchar*)m_matOriginal.data, m_matOriginal.cols, m_matOriginal.rows, m_matOriginal.step,QImage::Format_RGB888);
    QImage qimgThreshold((uchar*)matThreshold.data, matThreshold.cols, matThreshold.rows, matThreshold.step,QImage::Format_Indexed8);
    QImage qimgProcessed((uchar*)matProcessed.data, matProcessed.cols, matProcessed.rows, matProcessed.step,QImage::Format_RGB888);

    ui->img_rawImg->setPixmap(QPixmap::fromImage(qimgOriginal));
    ui->img_threshold->setPixmap(QPixmap::fromImage(qimgThreshold));
    ui->img_processed->setPixmap(QPixmap::fromImage(qimgProcessed));
}

void MainWindow::keyPressEvent(QKeyEvent *event)
{

    switch (event->key())
    {
    case Qt::Key_Right:
        if(m_photoList.size()-1>m_currentPhotoIndex)
            m_currentPhotoIndex++;
        break;
    case Qt::Key_Left:
        if(m_currentPhotoIndex>0)
            m_currentPhotoIndex--;
        break;
    }

}

void MainWindow::on_b_previousPhoto_clicked()
{
    if(m_currentPhotoIndex>0)
        m_currentPhotoIndex--;
    processFrameAndUpdateUI();
}

void MainWindow::on_b_nextPhoto_clicked()
{
    if(m_photoList.size()-1>m_currentPhotoIndex)
        m_currentPhotoIndex++;
    processFrameAndUpdateUI();
}

void MainWindow::on_sb_hMin_valueChanged(int arg1)
{
    processFrameAndUpdateUI();
}

void MainWindow::on_sb_hMax_valueChanged(int arg1)
{
    processFrameAndUpdateUI();
}

void MainWindow::on_sb_sMin_valueChanged(int arg1)
{
    processFrameAndUpdateUI();
}

void MainWindow::on_sb_sMax_valueChanged(int arg1)
{
    processFrameAndUpdateUI();
}

void MainWindow::on_sb_vMin_valueChanged(int arg1)
{
    processFrameAndUpdateUI();
}

void MainWindow::on_sb_vMax_valueChanged(int arg1)
{
    processFrameAndUpdateUI();
}

cv::Mat MainWindow::Overlap (cv::Mat original, cv::Mat thresh, int* pixelsProcesados){
    //the 2 img should be same size and the original should have 3 channels(coloured img)
    if(original.cols*original.rows == thresh.cols*thresh.rows && original.channels() == 3 && thresh.channels()==1){
        int indice=0;
        for(int i=0;i<original.cols*original.rows;i++){
            //if the the theshold pixel value < 200 it deletes the pixel at the original img
                if(thresh.data[i]<200){
                    original.data[i*3]=0;
                    original.data[i*3+1]=0;
                    original.data[i*3+2]=0;
                    *pixelsProcesados = *pixelsProcesados + 1;
                }
                indice = i;
        }
        return original;
    }
    else
        qDebug("Error en Overlap()");
}

int MainWindow::ColorMed (cv::Mat HSVMat, int* saturacionMed){
    int colMed = 0;
    int totalH = 0;
    int totalS = 0;
    *saturacionMed = 0;
    int contador = 0;
    for(int i =0 ;i<HSVMat.cols*HSVMat.rows*HSVMat.channels();i=i+3){
        if(HSVMat.data[i] > 0){
            totalH+= HSVMat.data[i];
            totalS+= HSVMat.data[i+1];
            contador++;
        }
    }
    //contador para que si hay muy pocos pixeles no de color
    if(contador>100){
        colMed = totalH/contador;
        *saturacionMed = totalS/contador;
    }
    else{
        colMed=0;
        *saturacionMed = 0;
    }

    return colMed;
}
