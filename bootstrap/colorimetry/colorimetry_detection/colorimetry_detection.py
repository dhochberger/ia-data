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
                                   OneHotEncoder)
from sklearn.svm import SVC


# load the dataset
def load_dataset(filename):
    csv_input = pd.read_csv(filename)

    x_label = csv_input['colors']
    features=[]
    colors=[]
    percent=[]
    for row in x_label:
        row_colors=[]
        row_percent=[]
        for color in json.loads(row.replace("\'", "\"")):
            row_colors.append(color['value'])
            row_percent.append(float(color['percent']))
        colors.append(row_colors)
        percent.append(row_percent)
        features.append([np.array(row_colors), np.array(row_percent)])

    y_label = csv_input['genre']
    genres_labels=[]
    for row in y_label:
        genres=json.loads(row.replace("\'", "\""))
        row_genre=[]
        for genre in genres:
            row_genre.append(genre)
        genres_labels.append(row_genre)
    return np.array(features), np.array(colors), percent, genres_labels

# prepare target
def prepare_targets(columns, y_train, y_test):
	le = MultiLabelBinarizer()
	le.fit(columns)
	y_train_enc = le.fit_transform(y_train)
	y_test_enc = le.fit_transform(y_test)
	return y_train_enc, y_test_enc

def separate_inputs(columns, array):
    target_1=[]
    target_2=[]
    for row in array:
        target_1.append(row[0])
        colors_weights=[0.0]*len(columns)
        for index, color in enumerate(row[0]):
            color_index = columns.index(color)
            colors_weights[color_index] += float(row[1][index])
        target_2.append(colors_weights)
    return np.array(target_1), np.array(target_2)
# load the dataset
X, X1, X2, Y = load_dataset('./output_movies_genre.csv')

print("X shape: {}".format(X.shape))
print("X1 shape: {}".format(X1.shape))

# split into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.25, shuffle=True)

print("X_train shape: {}".format(X_train.shape))
print("X_test shape: {}".format(X_test.shape))

genres_labels = ['Action', 'Adventure', 'Animation', 'Biography','Comedy', 'Crime', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western']
colors_labels = ['Black', 'Blue', 'Brown', 'Green', 'Grey', 'Orange', 'Pink', 'Purple', 'Red', 'White', 'Yellow']

X_train_1, X_train_2 = separate_inputs(colors_labels, X_train)
X_test_1, X_test_2 = separate_inputs(colors_labels, X_test)

# prepare output data
x1_train_enc, x1_test_enc = prepare_targets(colors_labels, X_train_1, X_test_1)
y_train_enc, y_test_enc = prepare_targets(genres_labels, y_train, y_test)

print(x1_train_enc.shape, X_train_2.shape, y_train_enc.shape)

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
    model.add(Dense(75, activation='relu', input_dim=n_inputs_1.shape[1]))
    model.add(Dropout(0.1))
    model.add(Dense(100, activation='relu'))
    model.add(Dropout(0.1))
    model.add(Dense(n_outputs.shape[1], activation='sigmoid'))
    sgd = SGD(lr=0.01, decay=1e-6, momentum=0.9, nesterov=True)
    model.compile(loss='binary_crossentropy',
                optimizer=sgd)

    model.fit(n_inputs_1, n_outputs, epochs=150)
    return model 


from os import path

model_percent = get_model(X_train_2, y_train_enc)
''' model_percent.save('model_percent') '''
model_colors = get_model(x1_train_enc, y_train_enc)
''' model_colors.save('model_colors') '''
''' model_percent = keras.models.load_model('model_percent')
model_colors = keras.models.load_model('model_colors') '''
prediction_percent = model_percent.predict(X_test_2)
predictions_colors = model_colors.predict(x1_test_enc)

print(genres_labels)
print(y_test_enc[0])
print(predictions_colors[0])
print('')
print(genres_labels)
print(y_test_enc[0])
print(prediction_percent[0])


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
