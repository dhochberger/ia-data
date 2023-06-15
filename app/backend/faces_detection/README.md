# Face detection

The number of faces, or their positions, are important features. Whether it’s full face or profil, it can also have an impact. <br>
Using an unsupervised framework requires being confident in your algorithm, since one can not automati- cally test the final performance.<br>
Write a program that displays detected faces in a poster.

# Library

Here is the list of libraries I used :
- numpy
- opencv-utils
- opencv-python

# Configuring the Local Environment

Create a directory for the project: 

```
mkdir face_detection
```

Change into the newly created directory :

```
cd face_detection
```

Create a virtual environment for this project.

```
python3 -m venv face_detection_env
```

Activate the isolated environment :

```
source face_detection_env/bin/activate
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
python version1.py ../imagesTest/people_with_phones.png
```