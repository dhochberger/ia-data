import cv2 
import pytesseract
import sys

imagePath = sys.argv[1]

image = cv2.imread(imagePath)
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Adding custom options
custom_config = r'--oem 3 --psm 6'
txt= pytesseract.image_to_string(gray, config=custom_config)
print(txt)