
import json

import numpy as np
import pandas as pd

csv_input = pd.read_csv('./output_movies_genre.csv')

y_label = csv_input['genre']
genres_labels=[]
for row in y_label:
    genres=json.loads(row.replace("\'", "\""))
    row_genre=[]
    for genre in genres:
        row_genre.append(genre)
    genres_labels.append(row_genre)

labels = ['Action', 'Adventure', 'Animation', 'Biography','Comedy', 'Crime', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western']

count_genres=[0] * len(labels)

for row in genres_labels:
    for value in row:
        if value in labels:
            index = labels.index(value)
            count_genres[index] += 1

print(count_genres)
print(sum(count_genres))
