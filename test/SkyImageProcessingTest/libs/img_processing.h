#ifndef IMG_PROCESSING_H
#define IMG_PROCESSING_H

#include <opencv2/opencv.hpp>
//#include <objects/globalvar.h>

/**
 * @brief ErodeDilate
 * Erode thresh image using erode_value and then dilates using dilate_value.
 * @param thresh
 * @param erode_value
 * @param dilate_value
 */
void ErodeDilate (cv::Mat &thresh , int erode_value, int dilate_value){
    //create structuring element that will be used to "dilate" and "erode" image.
    //the element chosen here is a rectangle
    cv::Mat erodeElement = getStructuringElement( cv::MORPH_RECT,cv::Size(erode_value,erode_value));
    //dilate with larger element so make sure object is nicely visible
    cv::Mat dilateElement = getStructuringElement( cv::MORPH_RECT,cv::Size(dilate_value,dilate_value));

    cv::erode(thresh,thresh,erodeElement);
    cv::erode(thresh,thresh,erodeElement);


    cv::dilate(thresh,thresh,dilateElement);
    cv::dilate(thresh,thresh,dilateElement);
}
/**
 * @brief Overlap
 * masks the original image using a threshold
 * @param original
 * @param thresh
 * @return
 */
cv::Mat Overlap (cv::Mat original, cv::Mat thresh){
    //the 2 img should be same size and the original should have 3 channels(coloured img)
    if(original.cols*original.rows == thresh.cols*thresh.rows && original.channels() == 3 && thresh.channels()==1){
        int indice=0;
        for(int i=0;i<original.cols*original.rows;i++){
            //if the the theshold pixel value < 200 it deletes the pixel at the original img
                if(thresh.data[i]<200){
                    original.data[i*3]=0;
                    original.data[i*3+1]=0;
                    original.data[i*3+2]=0;
                }
                indice = i;
        }
        return original;
    }
    else
        qDebug("Error en Overlap()");
}
/**
 * @brief Color
 * calculate the medium, maximum and minimum color Hue of the image
 * @param HSVMat
 * @return color_s (structure with min,med.max color inside)
 */
int Color (cv::Mat HSVMat){
/*    color_s res;
    res.max=0;
    res.min=180;
    int totalH = 0;
    int contador = 0;
    for(int i =0 ;i<HSVMat.cols*HSVMat.rows*HSVMat.channels();i=i+3){
        if(HSVMat.data[i] > 0){
            if(HSVMat.data[i] > res.max) res.max=HSVMat.data[i];
            if(HSVMat.data[i] < res.min) res.min = HSVMat.data[i];
            totalH+= HSVMat.data[i];
            contador++;
        }
    }
    //contador para que si hay muy pocos pixeles no de color
    if(contador>100)res.med = totalH/contador;
    else{
        res.med = 0;
        res.min = 0;
        res.max = 0;
    }

    return res;*/
}
/**
 * @brief matMarcosSetup
 * matMarcosHSV is a matrix that contains all RGB to HSV equivalent pixels
 * @param matMarcosHSV
 */
void matMarcosSetup(cv::Mat* matMarcosHSV)
{
   cv::Mat matMarcos;
   matMarcos = cv::Mat::zeros(16777216,1,CV_8UC3);
   *matMarcosHSV = cv::Mat::zeros(16777216,1,CV_8UC3);
   int x = 0;
   for(int i=0;i<256;i++){
       for(int  j=0;j<256;j++){
           for(int k=0;k<256;k++){
               matMarcos.data[x]=(uchar)i;
               x++;
               matMarcos.data[x]=(uchar)j;
               x++;
               matMarcos.data[x]=(uchar)k;
               x++;
           }
       }
   }
   cv::cvtColor(matMarcos,*matMarcosHSV,cv::COLOR_RGB2HSV);
   //posicion [r,g,b] = (r*65536+g*256+b)*3
}

/**
 * @brief RGB2HSV
 *      Image transformation RGB to HSV using matMarcosHSV calculated in method above
 * @param src
 * @param size
 * @param matMarcosHSV
 * @return
 */
uchar *RGB2HSV(uchar *src, int size, cv::Mat matMarcosHSV)
{
    uchar HSV[size];
    int r, g, b,indice = 0;
    for(int i=0;i<size;i=i+3){
        r=src[i];
        g=src[i+1];
        b=src[i+2];
        indice =(r*65536+g*256+b)*3;
        //indice = r*196608+g*768+b*3;
        HSV[i]=matMarcosHSV.data[indice];
        HSV[i+1]=matMarcosHSV.data[indice+1];
        HSV[i+2]=matMarcosHSV.data[indice+2];
    }
    return HSV;
}

/**
 * @brief Threshold
 *      return threshold data of a coloured (3 channel) data source
 *      minimos and maximos are the min and max values of each channel (3)
 * @param src
 * @param rows
 * @param cols
 * @param minimos
 * @param maximos
 * @return
 */
uchar *Threshold(uchar *src, int rows, int cols, int *minimos, int *maximos)
{
    int size = rows*cols;
    uchar* arraybyn;
    cv::Mat matPrueba = cv::Mat::zeros(rows,cols,CV_8UC1);
    arraybyn = matPrueba.data;
    memset(arraybyn,255,size);

    register uchar *ptr_src = src;
    register int *ptr_min = minimos;
    register int *ptr_max = maximos;
    register uchar* ptr_arraybyn = arraybyn;

    for(register int i=0;i<size;i++){
       *ptr_arraybyn=*ptr_arraybyn * (*ptr_src >= *ptr_min++ & *ptr_src <=*ptr_max++ );

        ptr_src++;
        *ptr_arraybyn=*ptr_arraybyn * (*ptr_src >= *ptr_min++ & *ptr_src <=*ptr_max++ );

        ptr_src++;
        *ptr_arraybyn=*ptr_arraybyn * (*ptr_src >= *ptr_min & *ptr_src <=*ptr_max );
        ptr_src++;

        ptr_min--;ptr_min--;
        ptr_max--;ptr_max--;
        ptr_arraybyn++;
    }
    return arraybyn;
}

/**
 * @brief focus
 * get the focus quality of the image, biger value is better.
 * @param imgMat
 * @return
 */
long focus (cv::Mat imgMat){
    uchar* arraycamara = imgMat.data;
    int TAMANOCAMARAY = imgMat.rows;
    int TAMANOCAMARAX = imgMat.cols;
    int CHANNELS = imgMat.channels();
    long sumatorio = 0;
    long npixels = 0;
    if (CHANNELS == 1){
        for (long i=1; i<TAMANOCAMARAY-1; i++){
            for (long j=1; j<TAMANOCAMARAX-1; j++){
                long horizontal = labs(arraycamara[(i-1)*TAMANOCAMARAX+j-1] + arraycamara[(i-1)*TAMANOCAMARAX+j] + arraycamara[(i-1)*TAMANOCAMARAX+j+1]
                    - arraycamara[(i+1)*TAMANOCAMARAX+j-1] - arraycamara[(i+1)*TAMANOCAMARAX+j] - arraycamara[(i+1)*TAMANOCAMARAX+j+1]);
                long vertical = labs(arraycamara[(i-1)*TAMANOCAMARAX+j-1] - arraycamara[(i-1)*TAMANOCAMARAX+j+1]
                    + arraycamara[i*TAMANOCAMARAX+j-1]  - arraycamara[i*TAMANOCAMARAX+j+1]
                    + arraycamara[(i+1)*TAMANOCAMARAX+j-1]  - arraycamara[(i+1)*TAMANOCAMARAX+j+1]);
                sumatorio = sumatorio + (horizontal + vertical) / 2;
                npixels++;
            }
        }
    }
    else{
        for (long i=1; i<TAMANOCAMARAY-1; i++){
            for (long j=1; j<TAMANOCAMARAX-1; j++){
                long horizontal = labs(arraycamara[3*((i-1)*TAMANOCAMARAX+j-1)+2] + arraycamara[3*((i-1)*TAMANOCAMARAX+j)+2] + arraycamara[3*((i-1)*TAMANOCAMARAX+j+1)+2]
                    - arraycamara[3*((i+1)*TAMANOCAMARAX+j-1)+2] - arraycamara[3*((i+1)*TAMANOCAMARAX+j)+2] - arraycamara[3*((i+1)*TAMANOCAMARAX+j+1)+2]);
                long vertical = labs(arraycamara[3*((i-1)*TAMANOCAMARAX+j-1)+2] - arraycamara[3*((i-1)*TAMANOCAMARAX+j+1)+2]
                    + arraycamara[3*(i*TAMANOCAMARAX+j-1)+2]  - arraycamara[3*(i*TAMANOCAMARAX+j+1)+2]
                    + arraycamara[3*((i+1)*TAMANOCAMARAX+j-1)+2]  - arraycamara[3*((i+1)*TAMANOCAMARAX+j+1)+2]);
                sumatorio = sumatorio + (horizontal+vertical)/2;
                npixels++;
            }
        }
    }
    return 8*sumatorio/npixels;
}

/**
  * @brief horizontalROI
  *         Calculate the horizontal limits for the region of interest (internal window)
  * @param src
  * @param x
  * @param width
  */
 void horizontalROI (cv::Mat src,int *x,int *width){
    QList<int> histogramaHorizontal;
    int min = 999;
    int max = 0;
    int posHorizontalFin=src.cols;
    int posHorizontalInicio=0;
    //Cuento blancos por columnas
    int posCol=0;
    int cuenta=0;
    for(int i=0;i<src.cols;i++){
        for(int j=0;j<src.rows;j++){
            posCol=i+j*src.cols;
            if(src.data[posCol]>200){
                cuenta++;
            }
        }
        if(max<cuenta) max=cuenta;
        histogramaHorizontal.append(cuenta);
        cuenta=0;
    }
    if(!histogramaHorizontal.isEmpty()){
        //analizo el histograma para marcar la posicion horizontal de inicio y fin de la fruta;
        int laMitad = histogramaHorizontal.size()/2;

        //Miro a ver si hay fruta en el centro

        if(histogramaHorizontal.at(laMitad)>0){
            //busco final por la derecha
            for(int i=laMitad;i<histogramaHorizontal.size();i++){
                if(histogramaHorizontal.at(i) == 0){
                    posHorizontalFin=i;
                    break;
                }
                posHorizontalFin=i;
            }
            min = 999;
            //busco final por la izq
            for(int i=laMitad;i>=0;i--){
                if(histogramaHorizontal.at(i) == 0){
                    posHorizontalInicio=i;
                    break;
                }
                posHorizontalInicio=i;
            }
        }
        else{
                posHorizontalInicio = 0;
                posHorizontalFin = 0;
        }
    }

    *x = posHorizontalInicio;
    *width = posHorizontalFin - posHorizontalInicio;
}

 /**
 * @brief verticalROI
 *      Calculate the vertical limits for the region of interest (internal window)
 * @param src
 * @param y
 * @param height
 * @param inicioHorizontal
 * @param finalHorizontal
 */
void verticalROI (cv::Mat src,int *y,int *height,int inicioHorizontal,int finalHorizontal){
    QList<int> histogramaVertical;
    int min = 999;
    int max = 0;
    int posVerticalFin=src.rows;
    int posVerticalInicio=0;
    //Cuento blancos por columnas
    int posCol=0;
    int cuenta=0;
    for(int i=0;i<src.rows;i++){
        for(int j=inicioHorizontal;j<finalHorizontal;j++){
        //for(int j=0;j<src.cols;j++){
            posCol=j+i*src.cols;
            if(src.data[posCol]>200){
                cuenta++;
            }
        }
        histogramaVertical.append(cuenta);
        if(max<cuenta) max=cuenta;
        cuenta=0;
    }
    if(!histogramaVertical.isEmpty()){
        //analizo el histograma para marcar la posicion horizontal de inicio y fin de la fruta;
        int laMitad = histogramaVertical.size()/2;
        //Miro a ver si hay fruta en el centro
        if(histogramaVertical.at(laMitad)>0){
            //busco final por la derecha
            for(int i=laMitad;i<histogramaVertical.size();i++){
                if(histogramaVertical.at(i) == 0){
                    posVerticalFin=i;
                    break;
                }
                posVerticalFin=i;
            }
            min = 999;

            for(int i=laMitad;i>=0;i--){
                if(histogramaVertical.at(i) == 0){
                    posVerticalInicio=i;
                    break;
                }
                posVerticalInicio=i;
            }
        }
        else{
                posVerticalInicio = 0;
                posVerticalFin = 0;
        }
    }
    *y = posVerticalInicio;
    *height = posVerticalFin - posVerticalInicio;
}

/**
* @brief getWindowROI
*       get the region of interest of an image.
* @param src
* @return
*/
cv::Rect getWindowROI(cv::Mat src)
{
    int x,y,height,width = 0;
    horizontalROI(src,&x,&width);
    verticalROI(src,&y,&height,x,x+width);

    //if(height==0||width==0)
    //    return cv::Rect(0,0,1,1);

    //return  cv::Rect(70,70,200,200);
    return cv::Rect(x,y,width,height);
}
/**
 * @brief fillTheshGaps
 * fill the holes inside the binary image
 * @param threshold
 */
void fillTheshGaps (cv::Mat threshold){
    uchar* arraybyn = threshold.data;
    //preprocesado para rellenar la fruta (de forma vertical para no rellenar el espacio entre 2 naranjas en la misma cazoleta)
    //recorrer la ventana de izquierda hacia derecha
    for (long j=0; j<threshold.cols; j++){
         //recorrer la ventana de arriba hacia abajo
        for (long k=0; k<threshold.rows-2; k++){
            //si encuentra 3 pixels blancos consecutivos entonces se ha encontrado el borde de la fruta
            if ((arraybyn[k*threshold.cols+j]) && (arraybyn[(k+1)*threshold.cols+j]) && (arraybyn[(k+2)*threshold.cols+j])){
                //recorrer la ventana de abajo hacia arriba
                for (long m=threshold.rows-1; m>k+5; m--){
                    //si encuentra 3 pixels blancos consecutivos entonces se ha encontrado el borde de la fruta
                    if ((arraybyn[m*threshold.cols+j]) && (arraybyn[(m-1)*threshold.cols+j]) && (arraybyn[(m-2)*threshold.cols+j])){
                        //recorrer la parte interior de la fruta
                        for (long n=k+3; n<=m-3; n++){
                            if (arraybyn[n*threshold.cols+j] == 0)
                                arraybyn[n*threshold.cols+j] = 254;
                        }
                        break;
                    }
                }
                break;
            }
        }
    }
}

/**
 * @brief detectDoubleFruit
 *      Dettects double fruit using doblefruta var, 100 is allwais false
 * @param threshold
 * @param doblefruta
 * @return
 */
bool detectDoubleFruit(cv::Mat threshold, int doblefruta){
    uchar* arraybyn = threshold.data;
    //detectar si hay fruta doble dentro de la ventana interna
    //calcular la posicion del maximo izquierdo
    long posicioni = 0;
    long maximo = 0;
    //recorrer la mitad izquierda de la ventana interna
    for (long j=0; j<threshold.cols/2; j++){
        long proyeccion = 0;
        for (int k=0; k<threshold.rows; k++)
            proyeccion += arraybyn[k*threshold.cols+j];
        if (maximo <= proyeccion)
        {
            maximo = proyeccion;
            posicioni = j;
        }
    }
    //calcular la posicion del maximo derecho
    long posiciond = 0;
    maximo = 0;
    //recorrer la mitad derecha de la ventana interna
    for (int j=threshold.cols/2; j<threshold.cols; j++)
    {
        long proyeccion = 0;
        for (int k=0; k<threshold.rows; k++)
            proyeccion += arraybyn[k*threshold.cols+j];
        if (maximo < proyeccion)
        {
            maximo = proyeccion;
            posiciond = j;
        }
    }
    //si los maximos estan separados significa que hay 2 frutas en la ventana interna
    if (100*(posiciond-posicioni) > threshold.rows*doblefruta)
        return true;  //marcar que no hay fruta para que el diametro, color y calidad valgan 0
    else return false;
}

/**
 * @brief getHueImg
 * return an img with all hue values (INCOMPLETE)
 * @return
 */
cv::Mat getHueImg(){
    cv::Mat hueMat = cv::Mat::zeros(20,180*3,CV_8UC3) ;
    int V = 250;
    int S = 250;
    int H = 0;
    int index=0;

    for(int i=0;i<hueMat.cols;i=i*hueMat.rows){
        if(index>=3){
            index=0;
            H++;
        }
        for(int j=0;j<hueMat.rows;j++){
            hueMat.data[i*j]=H;
            hueMat.data[i*j+1]=S;
            hueMat.data[i*j+2]=V;
        }
        index++;
    }
    return hueMat;
}
/**
 * @brief calculateQuality
 *      returns a deffect index based on the saturation of the img gived by qualityIndex
 * @param qualityIndex
 * @param HSV
 * @param Thresh
 * @return
 */
double calculateQuality(int qualityIndex, cv::Mat HSV, cv::Mat Thresh){
    //uchar *Threshold(uchar *src, int rows, int cols, int *minimos, int *maximos)
    double deffect = 0;
    int pixelCount = 0;

    cv::Mat thQuality = cv::Mat::zeros(HSV.rows,HSV.cols,CV_8UC1);
    for(int i=0;i<Thresh.rows*Thresh.cols;i++){
       if(Thresh.data[i]>5){
            if(HSV.data[i*3+1]<qualityIndex){
                deffect++;
                thQuality.data[i]=255;
            }
            pixelCount++;
        }
    }
    deffect = (deffect*100)/(double)pixelCount;
    thQuality.copyTo(Thresh);
    return deffect;
}
#endif // IMG_PROCESSING_H
