#-------------------------------------------------
#
# Project created by QtCreator 2015-04-11T19:32:29
#
#-------------------------------------------------

QT       += core gui

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = SkyImageProcessingTest
TEMPLATE = app

include(libs/libs.pri)

SOURCES += main.cpp\
        mainwindow.cpp

HEADERS  += mainwindow.h

FORMS    += mainwindow.ui

INCLUDEPATH += "/opt/opencv-2.4.9/release/include"
INCLUDEPATH += "/opt/synview/include"

LIBS += "/opt/opencv-2.4.9/release/lib/libopencv_calib3d.so.2.4.9"
LIBS += "/opt/opencv-2.4.9/release/lib/libopencv_contrib.so.2.4.9"
LIBS += "/opt/opencv-2.4.9/release/lib/libopencv_core.so.2.4.9"
LIBS += "/opt/opencv-2.4.9/release/lib/libopencv_features2d.so.2.4.9"
LIBS += "/opt/opencv-2.4.9/release/lib/libopencv_flann.so.2.4.9"
LIBS += "/opt/opencv-2.4.9/release/lib/libopencv_gpu.so.2.4.9"
LIBS += "/opt/opencv-2.4.9/release/lib/libopencv_highgui.so.2.4.9"
LIBS += "/opt/opencv-2.4.9/release/lib/libopencv_imgproc.so.2.4.9"
LIBS += "/opt/opencv-2.4.9/release/lib/libopencv_legacy.so.2.4.9"
LIBS += "/opt/opencv-2.4.9/release/lib/libopencv_ml.so.2.4.9"
LIBS += "/opt/opencv-2.4.9/release/lib/libopencv_objdetect.so.2.4.9"
LIBS += "/opt/opencv-2.4.9/release/lib/libopencv_ts.a"
LIBS += "/opt/opencv-2.4.9/release/lib/libopencv_video.so.2.4.9"

QMAKE_RPATHDIR += "/opt/opencv-2.4.9/release/lib/"
