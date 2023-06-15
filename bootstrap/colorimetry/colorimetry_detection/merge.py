import csv
import os
from os import path

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
import colorsys
import sys

import cv2

''' Colorimetry '''
from collections import Counter

import matplotlib.pyplot as plt
import numpy as np
from matplotlib import colors
from PIL import ImageColor
from sklearn.cluster import KMeans


def rgb_to_hex(rgb_color):
    hex_color = "#"
    for i in rgb_color:
        i = int(i)
        hex_color += ("{:02x}".format(i))
    return hex_color

def prep_image(raw_img):
    modified_img = cv2.resize(raw_img, (900, 600), interpolation = cv2.INTER_AREA)
    modified_img = modified_img.reshape(modified_img.shape[0]*modified_img.shape[1], 3)
    return modified_img

def color_analysis(img):
    clf = KMeans(n_clusters = 5)
    color_labels = clf.fit_predict(img)
    center_colors = clf.cluster_centers_
    counts = Counter(color_labels)
    ordered_colors = [center_colors[i] for i in counts.keys()]
    hex_colors = [rgb_to_hex(ordered_colors[i]) for i in counts.keys()]
    
    total_pixels = np.sum(list(counts.values()))
    color_PERCENT = [round((counts[i]*100/total_pixels),2) for i in counts.keys()]

    color_RGB = [ImageColor.getcolor(hex_colors[i], "RGB") for i in range(len(hex_colors))]
    color_HSV = [colorsys.rgb_to_hsv(color_RGB[i][0], color_RGB[i][1],color_RGB[i][2]) for i in range(len(hex_colors))]

    ''' plt.figure(figsize = (12, 8))
    plt.pie(counts.values(), labels = hex_colors, colors = hex_colors)
    plt.savefig("color_analysis_report.png") '''

    ''' for i in range(len(hex_colors)):
        color_RGB = ImageColor.getcolor(hex_colors[i], "RGB")
        color_HSV = colorsys.rgb_to_hsv(color_RGB[0], color_RGB[1],color_RGB[2])
        print(counts[i], hex_colors[i], color_RGB, color_HSV) '''
    return {"color_RGB": color_RGB, "color_HSV": color_HSV, "hex_colors": hex_colors, "ordered": ordered_colors, "percent": color_PERCENT}

import pandas as pd
import webcolors
from keras.models import load_model

model = load_model('colormodel_trained_90.h5')

#Classification Report

from sklearn.metrics import classification_report, confusion_matrix

target_names = ['Red', 'Green', 'Blue', 'Yellow', 'Orange', 'Pink', 'Purple', 'Brown', 'Grey', 'Black', 'White']

def closest_colour(requested_colour):
    min_colours = {}
    for key, name in webcolors.CSS3_HEX_TO_NAMES.items():
        r_c, g_c, b_c = webcolors.hex_to_rgb(key)
        rd = (r_c - requested_colour[0]) ** 2
        gd = (g_c - requested_colour[1]) ** 2
        bd = (b_c - requested_colour[2]) ** 2
        min_colours[(rd + gd + bd)] = name
    return min_colours[min(min_colours.keys())]

def get_colour_name(requested_colour):
    try:
        closest_name = actual_name = webcolors.rgb_to_name(requested_colour)
    except ValueError:
        closest_name = closest_colour(requested_colour)
        actual_name = None
    return actual_name, closest_name


def color_detection(image):
    lst_red = []
    lst_green = []
    lst_blue = []
    image_read = cv2.imread(image)
    image_colors = cv2.cvtColor(image_read, cv2.COLOR_BGR2RGB)
    modified_image = prep_image(image_colors)
    colors_results = color_analysis(modified_image)

    for i in colors_results['color_RGB']:
        lst_red.append(i[0])
        lst_green.append(i[1])
        lst_blue.append(i[2])
    columns = ['red', 'green', 'blue']

    df = pd.DataFrame(list(zip(lst_red, lst_green, lst_blue)), columns=columns)

    test_predictions = model.predict(df)
    #Selecting Class with highest confidence
    predicted_encoded_test_labels = np.argmax(test_predictions, axis=1) #Returns the indices of the maximum values along each row(axis=1)
    #Converting numpy array to pandas dataframe
    predicted_encoded_test_labels = pd.DataFrame(predicted_encoded_test_labels, columns=['Predicted Labels'])
    predicted_encoded_test_labels.to_csv('predictions.csv')

    column = predicted_encoded_test_labels['Predicted Labels']
    res_array = []
    for i in range(len(column)):
        res = {
            'color': colors_results['hex_colors'][i],
            'name': get_colour_name(ImageColor.getcolor(colors_results['hex_colors'][i], "RGB"))[1],
            'value': target_names[predicted_encoded_test_labels.values[i][0]],
            'percent': colors_results['percent'][i]
        }
        res_array.append(res)
    return res_array

import pandas as pd


def read_generate_csv(input_columns, output_column, inputFile, outputFile, func):
    csv_input = pd.read_csv(inputFile, chunksize=1000, usecols=input_columns)

    input_columns.append(output_column)
    columns=input_columns

    df = pd.DataFrame(columns=columns)

    header = True
    for chunk in csv_input:
        for index, row in chunk.iterrows():
            file_path = './Movie_Poster_Dataset/'+str(row['year'])+'/'+row['imdb_title_id']+'.jpg'
            if path.exists(file_path):
                df = df.append({columns[0]: row[columns[0]], columns[1]: row[columns[1]], columns[2]: json.dumps(func(file_path))}, ignore_index=True)
            else:
                df = df.append({columns[0]: row[columns[0]], columns[1]: row[columns[1]], columns[2]: ''}, ignore_index=True)

        df.to_csv(outputFile, header=header, columns=columns, mode='a', index=False)
        df = pd.DataFrame(columns=columns)
        header = False

read_generate_csv(input_columns=['imdb_title_id', 'year'],output_column='colors', inputFile='IMDb movies.csv', outputFile='IMDb_colors.csv', func=color_detection)

