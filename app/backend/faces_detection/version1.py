import sys

import cv2


def get_visage_from_specific_file():
    imagePath = sys.argv[1]

    #  convert image to grayscale
    image = cv2.imread(imagePath)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    #This code will create a faceCascade object that will load the Haar Cascade file with the cv2.CascadeClassifier method. This allows Python and your code to use the Haar Cascade.
    faceCascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
   
    #This generates a list of rectangles for all of the detected faces in the image. The list of rectangles is a collection of pixel locations from the image, in the form of Rect(x,y,w,h).
    faces = faceCascade.detectMultiScale(
        gray,  #this specifies the use of the OpenCV grayscale image object that you loaded earlier.
        scaleFactor=1.3, #this parameter specifies the rate to reduce the image size at each image scale.
        minNeighbors=3, #this parameter specifies how many neighbors, or detections, each candidate rectangle should have to retain it.
        minSize=(30, 30) #this allows you to define the minimum possible object size measured in pixels.
    )

    #After generating a list of rectangles, the faces are then counted with the len function.
    print("[INFO] Found {0} Faces!".format(len(faces)))

    #Next, you will use OpenCV’s .rectangle() method to draw a rectangle around the detected faces:
    for (x, y, w, h) in faces:
        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)

    #Write the new image to your local filesystem as faces_detected.jpg.
    status = cv2.imwrite('faces_detected.jpg', image)

    print("[INFO] Image faces_detected.jpg written to filesystem: ", status)

def get_number_visages(img_path):
    image = cv2.imread(img_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    #This code will create a faceCascade object that will load the Haar Cascade file with the cv2.CascadeClassifier method. This allows Python and your code to use the Haar Cascade.
    faceCascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
    faceCascadeLateral = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_profileface.xml")
    #This generates a list of rectangles for all of the detected faces in the image. The list of rectangles is a collection of pixel locations from the image, in the form of Rect(x,y,w,h).
    faces = faceCascade.detectMultiScale(
        gray,  #this specifies the use of the OpenCV grayscale image object that you loaded earlier.
        scaleFactor=1.3, #this parameter specifies the rate to reduce the image size at each image scale.
        minNeighbors=3, #this parameter specifies how many neighbors, or detections, each candidate rectangle should have to retain it.
        minSize=(30, 30) #this allows you to define the minimum possible object size measured in pixels.
    )
    faces_2 = faceCascade.detectMultiScale(
        gray,  #this specifies the use of the OpenCV grayscale image object that you loaded earlier.
        scaleFactor=1.3, #this parameter specifies the rate to reduce the image size at each image scale.
        minNeighbors=3, #this parameter specifies how many neighbors, or detections, each candidate rectangle should have to retain it.
        minSize=(30, 30) #this allows you to define the minimum possible object size measured in pixels.
    )
    return len(faces), len(faces_2)

import json

import numpy as np
import pandas as pd
from keras.layers import Dense
from keras.models import Sequential
from matplotlib import colors
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.multiclass import OneVsRestClassifier
from sklearn.naive_bayes import GaussianNB, MultinomialNB
from sklearn.preprocessing import (LabelEncoder, MultiLabelBinarizer,
                                   OneHotEncoder, StandardScaler)
from sklearn.svm import SVC


# load the dataset
def load_dataset(filename):
    csv_input = pd.read_csv(filename)

    x_label = csv_input['faces']

    y_label = csv_input['genre']
    genres_labels=[]
    for row in y_label:
        genres=json.loads(row.replace("\'", "\""))
        row_genre=[]
        for genre in genres:
            row_genre.append(genre)
        genres_labels.append(row_genre)
    return x_label, genres_labels

# prepare target
def prepare_targets(columns, y_train, y_test):
	le = MultiLabelBinarizer()
	le.fit(columns)
	y_train_enc = le.fit_transform(y_train)
	y_test_enc = le.fit_transform(y_test)
	return y_train_enc, y_test_enc

# load the dataset
X, Y = load_dataset('./IMDb_detections.csv')

print("X shape: {}".format(X.shape))

# split into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.25, shuffle=True)

print("X_train shape: {}".format(X_train.shape))
print("X_test shape: {}".format(X_test.shape))

genres_labels = ['Action', 'Adventure', 'Animation', 'Biography','Comedy', 'Crime', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western']

# prepare output data
y_train_enc, y_test_enc = prepare_targets(genres_labels, y_train, y_test)

from keras.layers import Dense
from keras.models import Sequential
from tensorflow import keras
# mlp for multi-label classification confusion_matrix
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.models import Sequential
from tensorflow.keras.optimizers import SGD


# get the model
def get_model(n_inputs_1, n_outputs):
    model = Sequential()
    model.add(Dense(50, activation='relu', input_dim=1))
    model.add(Dense(n_outputs.shape[1], activation='sigmoid'))
    sgd = SGD(lr=0.01, decay=1e-6, momentum=0.9, nesterov=True)
    model.compile(loss='binary_crossentropy',
                optimizer=sgd)

    model.fit(n_inputs_1, n_outputs, epochs=100)
    return model 


from os import path

''' print(X_train.values.reshape(-1,1))
clf = OneVsRestClassifier(SVC()).fit(X_train.values.reshape(-1,1), y_train_enc)

prediction_faces = clf.predict(X_test.values.reshape(-1,1)) '''

''' model_faces = get_model(X_train, y_train_enc)
model_faces.save('model_faces') '''
model_faces = keras.models.load_model('model_faces')
prediction_faces = model_faces.predict(X_test)

print(genres_labels)
print(y_test_enc[0])
print(prediction_faces[0])


count_genres=[0] * len(genres_labels)

for row in y_train:
    for value in row:
        if value in genres_labels:
            index = genres_labels.index(value)
            count_genres[index] += 1

print(count_genres)

count_genres=[0] * len(genres_labels)

for row in y_test:
    for value in row:
        if value in genres_labels:
            index = genres_labels.index(value)
            count_genres[index] += 1
print(count_genres)
