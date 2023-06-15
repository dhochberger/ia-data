from src.models import MovieSchema, Movies
from flask import Blueprint, request
from src.utils.response_type import Response

import numpy as np 
import pandas as pd 
import matplotlib.pyplot as plt

from scipy import misc
from glob import glob

analysis_route = Blueprint('analysis_route', __name__)

movies = pd.read_csv("./files/IMDB_movies.csv") 

@analysis_route.route('/analysis', methods=['GET'])
def get_analysis_dataset():
    total_movies = str(len(movies.index))
    #We will count the number of movies with a specific genre
    genrelist = []
    length = len(movies)
    for n in range(0,length):
        genres = str(movies.loc[n]["genre"])
        genres = genres.split(r", ")
        genrelist.extend(genres)
    unique_genres = list(set(genrelist))
    total_genre = str(len(unique_genres))
    return Response(label="Test ", data=[total_movies, total_genre], code=200).get_res()

