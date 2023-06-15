import os

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
import colorsys
import sys

import cv2

if len(sys.argv) > 1:
    image = sys.argv[1]
else:
    image = '../assets/Aesthetic/ Aesthetic - LITTLEDR3AMS  (31).jpg'
''' img_bgr = cv2.imread(image, cv2.IMREAD_COLOR)
img_gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)
img_hsv = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2HSV)
img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB) '''

''' Colorimetry '''
from collections import Counter

import matplotlib.pyplot as plt
import numpy as np
from matplotlib import colors
from PIL import ImageColor
from sklearn.cluster import KMeans

image = cv2.imread(image)
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

plt.imshow(image)

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
    clf = KMeans(n_clusters = 10)
    color_labels = clf.fit_predict(img)
    center_colors = clf.cluster_centers_
    counts = Counter(color_labels)
    ordered_colors = [center_colors[i] for i in counts.keys()]
    hex_colors = [rgb_to_hex(ordered_colors[i]) for i in counts.keys()]

    color_RGB = [ImageColor.getcolor(hex_colors[i], "RGB") for i in range(len(hex_colors))]
    color_HSV = [colorsys.rgb_to_hsv(color_RGB[i][0], color_RGB[i][1],color_RGB[i][2]) for i in range(len(hex_colors))]

    plt.figure(figsize = (12, 8))
    plt.pie(counts.values(), labels = hex_colors, colors = hex_colors)
    plt.savefig("color_analysis_report.png")
    print(ImageColor.getcolor(hex_colors[0], "RGB"))

    ''' for i in range(len(hex_colors)):
        color_RGB = ImageColor.getcolor(hex_colors[i], "RGB")
        color_HSV = colorsys.rgb_to_hsv(color_RGB[0], color_RGB[1],color_RGB[2])
        print(counts[i], hex_colors[i], color_RGB, color_HSV) '''
    return {"color_RGB": color_RGB, "color_HSV": color_HSV, "hex_colors": hex_colors, "ordered": ordered_colors}

modified_image = prep_image(image)
colors_results = color_analysis(modified_image)

import pandas as pd
import webcolors
from keras.models import load_model

model = load_model('colormodel_trained_90.h5')

lst_red = []
lst_green = []
lst_blue = []
for i in colors_results['color_RGB']:
    lst_red.append(i[0])
    lst_green.append(i[1])
    lst_blue.append(i[2])
columns = ['red', 'green', 'blue']

df = pd.DataFrame(list(zip(lst_red, lst_green, lst_blue)), columns=columns)

test_predictions = model.predict(df)
print("shape is {}".format(test_predictions.shape))  
#Selecting Class with highest confidence
predicted_encoded_test_labels = np.argmax(test_predictions, axis=1) #Returns the indices of the maximum values along each row(axis=1)
#Converting numpy array to pandas dataframe
predicted_encoded_test_labels = pd.DataFrame(predicted_encoded_test_labels, columns=['Predicted Labels'])
predicted_encoded_test_labels.to_csv('predictions.csv')

column = predicted_encoded_test_labels['Predicted Labels']
target_names = ['Red', 'Green', 'Blue', 'Yellow', 'Orange', 'Pink', 'Purple', 'Brown', 'Grey', 'Black', 'White']

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

for i in range(len(column)):
    print('color :', colors_results['hex_colors'][i],'name :', get_colour_name(ImageColor.getcolor(colors_results['hex_colors'][i], "RGB")) ,'value :', target_names[predicted_encoded_test_labels.values[i][0]])

