#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QImage>
#include <QKeyEvent>
#include <QTimer>

#include "opencv2/opencv.hpp"

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();

private slots:
    void processFrameAndUpdateUI();

    void on_b_previousPhoto_clicked();

    void on_b_nextPhoto_clicked();

    void on_sb_hMin_valueChanged(int arg1);

    void on_sb_hMax_valueChanged(int arg1);

    void on_sb_sMin_valueChanged(int arg1);

    void on_sb_sMax_valueChanged(int arg1);

    void on_sb_vMin_valueChanged(int arg1);

    void on_sb_vMax_valueChanged(int arg1);

private:
    void initComponents();
    void fillPhotoList();    
    void keyPressEvent(QKeyEvent *event);
    cv::Mat Overlap (cv::Mat original, cv::Mat thresh, int *pixelsProcesados);
    int ColorMed (cv::Mat HSVMat, int* saturacionMed);

    Ui::MainWindow *ui;

    QStringList m_photoList;
    int m_currentPhotoIndex;

    IplImage* m_img;

    cv::Mat m_matOriginal;
    cv::Mat m_matThreshold;
    cv::Mat m_matProcessed;

    QTimer* m_timer;

};

#endif // MAINWINDOW_H
