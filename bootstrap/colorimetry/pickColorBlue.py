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

    #define kernel size
    kernel = np.ones((5,5),np.uint8)

    # Segment only the detected region
    blue_mask = cv2.dilate(blue_mask, kernel)
    res_blue = cv2.bitwise_and(hsvImage, hsvImage, mask=blue_mask)

    # Creating contour to track blue color
    contours, hierarchy = cv2.findContours(blue_mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
   
    
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