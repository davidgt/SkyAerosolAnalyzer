/********************************************************************************
** Form generated from reading UI file 'mainwindow.ui'
**
** Created by: Qt User Interface Compiler version 5.4.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_MAINWINDOW_H
#define UI_MAINWINDOW_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QFrame>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QSpinBox>
#include <QtWidgets/QStatusBar>
#include <QtWidgets/QTabWidget>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_MainWindow
{
public:
    QWidget *centralWidget;
    QGridLayout *gridLayout;
    QFrame *frame;
    QGridLayout *gridLayout_2;
    QFrame *frame_2;
    QGridLayout *gridLayout_3;
    QLabel *label_2;
    QSpinBox *sb_hMin;
    QSpinBox *sb_hMax;
    QLabel *label_3;
    QSpinBox *sb_sMin;
    QSpinBox *sb_sMax;
    QLabel *label_4;
    QSpinBox *sb_vMin;
    QSpinBox *sb_vMax;
    QFrame *frame_3;
    QGridLayout *gridLayout_7;
    QLabel *label_7;
    QLabel *l_skyPercent;
    QLabel *label_9;
    QLabel *l_skyColor;
    QLabel *label_11;
    QLabel *l_saturation;
    QTabWidget *tabWidget;
    QWidget *tab;
    QGridLayout *gridLayout_5;
    QLabel *img_rawImg;
    QWidget *tab_2;
    QGridLayout *gridLayout_4;
    QLabel *img_threshold;
    QWidget *tab_3;
    QGridLayout *gridLayout_6;
    QLabel *img_processed;
    QFrame *frame_4;
    QGridLayout *gridLayout_8;
    QPushButton *b_previousPhoto;
    QPushButton *b_nextPhoto;
    QStatusBar *statusBar;

    void setupUi(QMainWindow *MainWindow)
    {
        if (MainWindow->objectName().isEmpty())
            MainWindow->setObjectName(QStringLiteral("MainWindow"));
        MainWindow->resize(840, 522);
        centralWidget = new QWidget(MainWindow);
        centralWidget->setObjectName(QStringLiteral("centralWidget"));
        gridLayout = new QGridLayout(centralWidget);
        gridLayout->setSpacing(6);
        gridLayout->setContentsMargins(11, 11, 11, 11);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        frame = new QFrame(centralWidget);
        frame->setObjectName(QStringLiteral("frame"));
        frame->setFrameShape(QFrame::StyledPanel);
        frame->setFrameShadow(QFrame::Raised);
        gridLayout_2 = new QGridLayout(frame);
        gridLayout_2->setSpacing(6);
        gridLayout_2->setContentsMargins(11, 11, 11, 11);
        gridLayout_2->setObjectName(QStringLiteral("gridLayout_2"));
        frame_2 = new QFrame(frame);
        frame_2->setObjectName(QStringLiteral("frame_2"));
        frame_2->setFrameShape(QFrame::StyledPanel);
        frame_2->setFrameShadow(QFrame::Raised);
        gridLayout_3 = new QGridLayout(frame_2);
        gridLayout_3->setSpacing(6);
        gridLayout_3->setContentsMargins(11, 11, 11, 11);
        gridLayout_3->setObjectName(QStringLiteral("gridLayout_3"));
        label_2 = new QLabel(frame_2);
        label_2->setObjectName(QStringLiteral("label_2"));

        gridLayout_3->addWidget(label_2, 0, 0, 1, 1);

        sb_hMin = new QSpinBox(frame_2);
        sb_hMin->setObjectName(QStringLiteral("sb_hMin"));
        sb_hMin->setMaximum(255);

        gridLayout_3->addWidget(sb_hMin, 0, 1, 1, 1);

        sb_hMax = new QSpinBox(frame_2);
        sb_hMax->setObjectName(QStringLiteral("sb_hMax"));
        sb_hMax->setMaximum(255);
        sb_hMax->setValue(255);

        gridLayout_3->addWidget(sb_hMax, 0, 2, 1, 1);

        label_3 = new QLabel(frame_2);
        label_3->setObjectName(QStringLiteral("label_3"));

        gridLayout_3->addWidget(label_3, 1, 0, 1, 1);

        sb_sMin = new QSpinBox(frame_2);
        sb_sMin->setObjectName(QStringLiteral("sb_sMin"));
        sb_sMin->setMaximum(255);

        gridLayout_3->addWidget(sb_sMin, 1, 1, 1, 1);

        sb_sMax = new QSpinBox(frame_2);
        sb_sMax->setObjectName(QStringLiteral("sb_sMax"));
        sb_sMax->setMaximum(255);
        sb_sMax->setValue(255);

        gridLayout_3->addWidget(sb_sMax, 1, 2, 1, 1);

        label_4 = new QLabel(frame_2);
        label_4->setObjectName(QStringLiteral("label_4"));

        gridLayout_3->addWidget(label_4, 2, 0, 1, 1);

        sb_vMin = new QSpinBox(frame_2);
        sb_vMin->setObjectName(QStringLiteral("sb_vMin"));
        sb_vMin->setMaximum(255);

        gridLayout_3->addWidget(sb_vMin, 2, 1, 1, 1);

        sb_vMax = new QSpinBox(frame_2);
        sb_vMax->setObjectName(QStringLiteral("sb_vMax"));
        sb_vMax->setMaximum(255);
        sb_vMax->setValue(255);

        gridLayout_3->addWidget(sb_vMax, 2, 2, 1, 1);


        gridLayout_2->addWidget(frame_2, 0, 0, 1, 1);

        frame_3 = new QFrame(frame);
        frame_3->setObjectName(QStringLiteral("frame_3"));
        frame_3->setFrameShape(QFrame::StyledPanel);
        frame_3->setFrameShadow(QFrame::Raised);
        gridLayout_7 = new QGridLayout(frame_3);
        gridLayout_7->setSpacing(6);
        gridLayout_7->setContentsMargins(11, 11, 11, 11);
        gridLayout_7->setObjectName(QStringLiteral("gridLayout_7"));
        label_7 = new QLabel(frame_3);
        label_7->setObjectName(QStringLiteral("label_7"));

        gridLayout_7->addWidget(label_7, 0, 0, 1, 1);

        l_skyPercent = new QLabel(frame_3);
        l_skyPercent->setObjectName(QStringLiteral("l_skyPercent"));

        gridLayout_7->addWidget(l_skyPercent, 0, 1, 1, 2);

        label_9 = new QLabel(frame_3);
        label_9->setObjectName(QStringLiteral("label_9"));

        gridLayout_7->addWidget(label_9, 1, 0, 1, 1);

        l_skyColor = new QLabel(frame_3);
        l_skyColor->setObjectName(QStringLiteral("l_skyColor"));

        gridLayout_7->addWidget(l_skyColor, 1, 1, 1, 2);

        label_11 = new QLabel(frame_3);
        label_11->setObjectName(QStringLiteral("label_11"));

        gridLayout_7->addWidget(label_11, 2, 0, 1, 1);

        l_saturation = new QLabel(frame_3);
        l_saturation->setObjectName(QStringLiteral("l_saturation"));

        gridLayout_7->addWidget(l_saturation, 2, 1, 1, 2);


        gridLayout_2->addWidget(frame_3, 0, 1, 1, 1);


        gridLayout->addWidget(frame, 2, 0, 1, 1);

        tabWidget = new QTabWidget(centralWidget);
        tabWidget->setObjectName(QStringLiteral("tabWidget"));
        tab = new QWidget();
        tab->setObjectName(QStringLiteral("tab"));
        gridLayout_5 = new QGridLayout(tab);
        gridLayout_5->setSpacing(6);
        gridLayout_5->setContentsMargins(11, 11, 11, 11);
        gridLayout_5->setObjectName(QStringLiteral("gridLayout_5"));
        img_rawImg = new QLabel(tab);
        img_rawImg->setObjectName(QStringLiteral("img_rawImg"));

        gridLayout_5->addWidget(img_rawImg, 0, 0, 1, 1);

        tabWidget->addTab(tab, QString());
        tab_2 = new QWidget();
        tab_2->setObjectName(QStringLiteral("tab_2"));
        gridLayout_4 = new QGridLayout(tab_2);
        gridLayout_4->setSpacing(6);
        gridLayout_4->setContentsMargins(11, 11, 11, 11);
        gridLayout_4->setObjectName(QStringLiteral("gridLayout_4"));
        img_threshold = new QLabel(tab_2);
        img_threshold->setObjectName(QStringLiteral("img_threshold"));

        gridLayout_4->addWidget(img_threshold, 0, 0, 1, 1);

        tabWidget->addTab(tab_2, QString());
        tab_3 = new QWidget();
        tab_3->setObjectName(QStringLiteral("tab_3"));
        gridLayout_6 = new QGridLayout(tab_3);
        gridLayout_6->setSpacing(6);
        gridLayout_6->setContentsMargins(11, 11, 11, 11);
        gridLayout_6->setObjectName(QStringLiteral("gridLayout_6"));
        img_processed = new QLabel(tab_3);
        img_processed->setObjectName(QStringLiteral("img_processed"));

        gridLayout_6->addWidget(img_processed, 0, 0, 1, 1);

        tabWidget->addTab(tab_3, QString());

        gridLayout->addWidget(tabWidget, 1, 0, 1, 1);

        frame_4 = new QFrame(centralWidget);
        frame_4->setObjectName(QStringLiteral("frame_4"));
        frame_4->setFrameShape(QFrame::StyledPanel);
        frame_4->setFrameShadow(QFrame::Raised);
        gridLayout_8 = new QGridLayout(frame_4);
        gridLayout_8->setSpacing(6);
        gridLayout_8->setContentsMargins(11, 11, 11, 11);
        gridLayout_8->setObjectName(QStringLiteral("gridLayout_8"));
        b_previousPhoto = new QPushButton(frame_4);
        b_previousPhoto->setObjectName(QStringLiteral("b_previousPhoto"));

        gridLayout_8->addWidget(b_previousPhoto, 0, 0, 1, 1);

        b_nextPhoto = new QPushButton(frame_4);
        b_nextPhoto->setObjectName(QStringLiteral("b_nextPhoto"));

        gridLayout_8->addWidget(b_nextPhoto, 0, 1, 1, 1);


        gridLayout->addWidget(frame_4, 0, 0, 1, 1);

        MainWindow->setCentralWidget(centralWidget);
        statusBar = new QStatusBar(MainWindow);
        statusBar->setObjectName(QStringLiteral("statusBar"));
        MainWindow->setStatusBar(statusBar);

        retranslateUi(MainWindow);

        tabWidget->setCurrentIndex(0);


        QMetaObject::connectSlotsByName(MainWindow);
    } // setupUi

    void retranslateUi(QMainWindow *MainWindow)
    {
        MainWindow->setWindowTitle(QApplication::translate("MainWindow", "MainWindow", 0));
        label_2->setText(QApplication::translate("MainWindow", "H:", 0));
        label_3->setText(QApplication::translate("MainWindow", "S:", 0));
        label_4->setText(QApplication::translate("MainWindow", "V:", 0));
        label_7->setText(QApplication::translate("MainWindow", "% de cielo:", 0));
        l_skyPercent->setText(QApplication::translate("MainWindow", "TextLabel", 0));
        label_9->setText(QApplication::translate("MainWindow", "color:", 0));
        l_skyColor->setText(QApplication::translate("MainWindow", "TextLabel", 0));
        label_11->setText(QApplication::translate("MainWindow", "saturacion:", 0));
        l_saturation->setText(QApplication::translate("MainWindow", "TextLabel", 0));
        img_rawImg->setText(QApplication::translate("MainWindow", "No_Image", 0));
        tabWidget->setTabText(tabWidget->indexOf(tab), QApplication::translate("MainWindow", "Raw Image", 0));
        img_threshold->setText(QApplication::translate("MainWindow", "TextLabel", 0));
        tabWidget->setTabText(tabWidget->indexOf(tab_2), QApplication::translate("MainWindow", "Threshold", 0));
        img_processed->setText(QApplication::translate("MainWindow", "TextLabel", 0));
        tabWidget->setTabText(tabWidget->indexOf(tab_3), QApplication::translate("MainWindow", "Processed", 0));
        b_previousPhoto->setText(QApplication::translate("MainWindow", " <-- Previous photo", 0));
        b_nextPhoto->setText(QApplication::translate("MainWindow", "Next photo -->", 0));
    } // retranslateUi

};

namespace Ui {
    class MainWindow: public Ui_MainWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_MAINWINDOW_H
