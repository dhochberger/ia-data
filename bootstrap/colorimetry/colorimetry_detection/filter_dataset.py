import json
from os import path

import pandas as pd

csv_input = pd.read_csv('./sorted_movies.csv')
movies_input = pd.read_csv('./IMDb movies.csv')
columns=['imdb_title_id', 'year', 'colors', 'genre']

df = pd.DataFrame(columns=columns)
header = True

for index, row in csv_input.iterrows():
    get_genre = movies_input[movies_input['imdb_title_id'] == row['imdb_title_id']]['genre']
    genres = get_genre.values[0].split(', ')
    row["genre"] = genres
    df = df.append(row, ignore_index=True)

df.to_csv('output_movies_genre.csv', header=header, columns=columns, index=False)
df = pd.DataFrame(columns=columns)
header = False
