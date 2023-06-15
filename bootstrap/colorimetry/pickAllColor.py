# import the necessary packages
import numpy as np
import argparse
import cv2
import sys

#start a while loop
while(1):
    # construct the argument parse and parse the arguments
    imagePath = sys.argv[1]

    #  convert image to hsv colorspace
    imageFrame = cv2.imread(imagePath)
    hsvImage = cv2.cvtColor(imageFrame,cv2.COLOR_BGR2HSV)

    # Set range for blue color and 
    # define mask
    blue_lower = np.array([94, 80, 2], np.uint8)
    blue_upper = np.array([120, 255, 255], np.uint8)
    blue_mask = cv2.inRange(hsvImage, blue_lower, blue_upper)

    # Set range for red color and 
    # define mask
    red_lower = np.array([0, 50, 50], np.uint8)
    red_upper = np.array([10, 255, 255], np.uint8)
    red_mask = cv2.inRange(hsvImage, red_lower, red_upper)

    # Set range for yellow color and 
    # define mask
    yellow_lower = np.array([20, 100, 100], np.uint8)
    yellow_upper = np.array([30, 255, 255], np.uint8)
    yellow_mask = cv2.inRange(hsvImage, yellow_lower, yellow_upper)

    # Set range for green color and 
    # define mask
    green_lower = np.array([25, 52, 72], np.uint8)
    green_upper = np.array([102, 255, 255], np.uint8)
    green_mask = cv2.inRange(hsvImage, green_lower, green_upper)

    #define kernel size
    kernel = np.ones((5,5),np.uint8)

    # Segment only the detected region
    blue_mask = cv2.dilate(blue_mask, kernel)
    res_blue = cv2.bitwise_and(hsvImage, hsvImage, mask=blue_mask)

    # Segment only the detected region
    red_mask = cv2.dilate(red_mask, kernel)
    res_red = cv2.bitwise_and(hsvImage, hsvImage, mask=red_mask)

    # Segment only the detected region
    yellow_mask = cv2.dilate(yellow_mask, kernel)
    res_yellow = cv2.bitwise_and(hsvImage, hsvImage, mask=yellow_mask)

    # Segment only the detected region
    green_mask = cv2.dilate(green_mask, kernel)
    res_green = cv2.bitwise_and(hsvImage, hsvImage, mask=green_mask)

    # Creating contour to track blue color
    contours_blue, hierarchy_blue = cv2.findContours(blue_mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    for pic, contour in enumerate(contours_blue):
        area = cv2.contourArea(contour)
        if(area > 300):
            x, y, w, h = cv2.boundingRect(contour)
            imageFrame = cv2.rectangle(imageFrame, (x, y),(x + w, y + h),(255, 0, 0), 2)

    # Creating contour to track red color
    contours_red, hierarchy_red = cv2.findContours(red_mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    for pic, contour in enumerate(contours_red):
        area = cv2.contourArea(contour)
        if(area > 300):
            x, y, w, h = cv2.boundingRect(contour)
            imageFrame = cv2.rectangle(imageFrame, (x, y),(x + w, y + h),(0, 0, 255), 2)

    # Creating contour to track yellow color
    contours_yellow, hierarchy_yellow = cv2.findContours(yellow_mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    for pic, contour in enumerate(contours_yellow):
        area = cv2.contourArea(contour)
        if(area > 300):
            x, y, w, h = cv2.boundingRect(contour)
            imageFrame = cv2.rectangle(imageFrame, (x, y),(x + w, y + h),(0, 255, 255), 2)

    # Creating contour to track green color
    contours_green, hierarchy_green = cv2.findContours(green_mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    for pic, contour in enumerate(contours_green):
        area = cv2.contourArea(contour)
        if(area > 300):
            x, y, w, h = cv2.boundingRect(contour)
            imageFrame = cv2.rectangle(imageFrame, (x, y),(x + w, y + h),(0, 255, 0), 2)

    # Showing the output
    cv2.imshow("Color Detection in Real-TIme", imageFrame)
    if cv2.waitKey(10) & 0xFF == ord('q'):
        cap.release()
        cv2.destroyAllWindows()
        break