# Colorimetry

Among other features that can be extracted from a poster, colorimetry may be rich in information. But colorimetry does not restrict to mean color only. <br>
It encompasses color emotion, color harmony, color variance. . .

# Library

Here is the list of libraries I used :
- numpy
- opencv-utils
- opencv-python

# Configuring the Local Environment

Create a directory for the project: 

```
mkdir colorimetry
```

Change into the newly created directory :

```
cd colorimetry
```

Create a virtual environment for this project.

```
python3 -m venv colorimetry_env
```

Activate the isolated environment :

```
source colorimetry_env/bin/activate
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
python pickAllColor.py ../imagesTest/people_with_phones.png
```