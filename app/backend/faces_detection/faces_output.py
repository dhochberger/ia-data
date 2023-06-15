import base64

import cv2
import numpy as np
import pandas as pd
from shapely.geometry import Polygon
from tensorflow import keras

#This code will create a faceCascade object that will load the Haar Cascade file with the cv2.CascadeClassifier method. This allows Python and your code to use the Haar Cascade.
faceCascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
faceCascadeLateral = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_profileface.xml")
model_faces = keras.models.load_model('faces_detection/model_faces')

def get_number_visages(image=None, base64_data=None):

    if image:
        img = cv2.imread(image)
    elif base64_data:
        encoded_data = base64_data.split(',')[1]
        nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    #This generates a list of rectangles for all of the detected faces in the image. The list of rectangles is a collection of pixel locations from the image, in the form of Rect(x,y,w,h).
    faces = faceCascade.detectMultiScale(
        gray,  #this specifies the use of the OpenCV grayscale image object that you loaded earlier.
        scaleFactor=1.3, #this parameter specifies the rate to reduce the image size at each image scale.
        minNeighbors=3, #this parameter specifies how many neighbors, or detections, each candidate rectangle should have to retain it.
        minSize=(30, 30) #this allows you to define the minimum possible object size measured in pixels.
    )
    faces_2 = faceCascadeLateral.detectMultiScale(
        gray,  #this specifies the use of the OpenCV grayscale image object that you loaded earlier.
        scaleFactor=1.3, #this parameter specifies the rate to reduce the image size at each image scale.
        minNeighbors=3, #this parameter specifies how many neighbors, or detections, each candidate rectangle should have to retain it.
        minSize=(30, 30) #this allows you to define the minimum possible object size measured in pixels.
    )
    polygonsa=[]
    if len(faces) > 0:
        for (x, y, w, h) in faces:
             polygonsa.append(Polygon([(x, y),(y,w),(w,h),(h,x)]))
    polygonsb=[]
    if len(faces_2) > 0:
        for (x, y, w, h) in faces_2:
             polygonsb.append(Polygon([(x, y),(y,w),(w,h),(h,x)]))
    faces_total=[]
    if len(polygonsa) > 0 and len(polygonsb) > 0:
        for polygona in range(len(polygonsa)):
            for polygonb in range(len(polygonsb)):
                if polygonsa[polygona] and polygonsb[polygonb]:
                    if polygonsa[polygona].contains(polygonsb[polygonb]):
                        faces_total.append(polygonsa[polygona])
                        polygonsa[polygona] = ''
                if polygonsa[polygona] and polygonsb[polygonb]:
                    if polygonsb[polygonb].contains(polygonsa[polygona]):
                        faces_total.append(polygonsb[polygonb])
                        polygonsb[polygonb] = ''
        faces_total = faces_total + polygonsa + polygonsb
    else:
        faces_total = faces_total + polygonsa + polygonsb
    len_faces_total = len(faces_total)
    if len(faces_total) > (len(faces) + len(faces_2)):
        len_faces_total = len(faces) + len(faces_2)
    return len(faces), len(faces_2), len_faces_total

genres_labels = ['Action', 'Adventure', 'Animation', 'Biography','Comedy', 'Crime', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western']


def detect_faces(output_columns, image=None, base64_data=None):
    faces_1, faces2, faces_total = get_number_visages(image, base64_data)
    print(faces_total)
    prediction_faces = model_faces.predict([faces_total])
    genres=[]
    for item in range(len(prediction_faces[0])):
        if prediction_faces[0][item]>0.4:
            genres.append(output_columns[item])
    return faces_total, prediction_faces[0].tolist(), genres
