# OCR

Text-based features are probably the most important ones. <br>
It includes font, text size, name of the movie maker or of actors and actresses, composition, text, color,...  <br>
Extracting these features requires two steps : 
1. OCR,which is getting the text from the poster 
2. text analysis.

OCR is a complex data, and you are not expected to develop your own algorithm.

# Library

Here is the list of libraries I used :
- numpy
- opencv-utils
- opencv-python
- pytesseract

# Configuring the Local Environment

Create a directory for the project: 

```
mkdir colorimetry
```

Change into the newly created directory :

```
cd ocr
```

Create a virtual environment for this project.

```
python3 -m venv ocr_env
```

Activate the isolated environment :

```
source ocr_env/bin/activate
```

You create a requirements.txt file. This file indicates the necessary Python dependencies.
Next, you need to install three dependencies to complete this tutorial:

- numpy is a Python library that adds support for large, multi-dimensional arrays. It also includes a large collection of mathematical functions to operate on the arrays
- opencv-utils : this is the extended library for OpenCV that includes helper functions.
- opencv-python : this is the core OpenCV module that Python uses.

Now, install the dependencies by passing the requirements.txt file to the Python package manager, pip. The -r flag specifies the location of requirements.txt file.

```
pip install --upgrade pip
pip install -r requirements.txt
```
<br>

## Build

```
python version1.py ../imagesTest/test.png
```