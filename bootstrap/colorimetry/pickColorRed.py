# import the necessary packages
import numpy as np
import argparse
import cv2
import sys

#start a while loop
while(1):

    # construct the argument parse and parse the arguments
    imagePath = sys.argv[1]

    # convert image to hsv colorspace
    imageFrame = cv2.imread(imagePath)
    hsvImage = cv2.cvtColor(imageFrame,cv2.COLOR_BGR2HSV)

    # Set range for red color and 
    # define mask
    red_lower = np.array([0, 50, 50], np.uint8)
    red_upper = np.array([10, 255, 255], np.uint8)
    red_mask = cv2.inRange(hsvImage, red_lower, red_upper)

    #define kernel size
    kernel = np.ones((5,5),np.uint8)

    # Remove unnecessary noise from red mask

    # Segment only the detected region
    red_mask = cv2.dilate(red_mask, kernel)
    res_red = cv2.bitwise_and(hsvImage, hsvImage, mask=red_mask)

    # Creating contour to track red color
    contours, hierarchy = cv2.findContours(red_mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
   
    
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