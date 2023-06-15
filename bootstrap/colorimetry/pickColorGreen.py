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

    # Set range for green color and 
    # define mask
    green_lower = np.array([25, 52, 72], np.uint8)
    green_upper = np.array([102, 255, 255], np.uint8)
    green_mask = cv2.inRange(hsvImage, green_lower, green_upper)

    #define kernel size
    kernel = np.ones((5,5),"uint8")

    # Segment only the detected region
    green_mask = cv2.dilate(green_mask, kernel)
    res_green = cv2.bitwise_and(hsvImage, hsvImage, mask=green_mask)

    # Creating contour to track green color
    contours, hierarchy = cv2.findContours(green_mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
   
    
    for pic, contour in enumerate(contours):
        area = cv2.contourArea(contour)
        if(area > 300):
            x, y, w, h = cv2.boundingRect(contour)
            imageFrame = cv2.rectangle(imageFrame, (x, y),(x + w, y + h),(0, 0, 0), 2)

    # Showing the output
    cv2.imshow("Color Detection in Real-TIme", imageFrame)
    if cv2.waitKey(10) & 0xFF == ord('q'):
        cap.release()
        cv2.destroyAllWindows()
        break