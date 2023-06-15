from src.database import db


class Movie(db.Document):
    imdb_title_id = db.StringField(required=True, unique=True)
    title = db.StringField(required=True)
    original_title = db.StringField(required=True)
    year = db.IntField(required=True)
    date_published = db.StringField(required=True)
    genre = db.StringField(required=True)
    duration = db.IntField(required=True)
    country = db.StringField(required=True)
    language = db.StringField(required=True)
    director = db.StringField(required=True)
    writer = db.StringField(required=True)
    production_company = db.StringField(required=True)
    actors = db.StringField(required=True)
    description = db.StringField(required=True)
    avg_vote = db.FloatField(required=True)
    votes = db.IntField(required=True)
    budget = db.StringField(required=True)
    usa_gross_income = db.StringField(required=True)
    worlwide_gross_income = db.StringField(required=True)
    metascore = db.FloatField(required=True)
    reviews_from_users = db.FloatField(required=True)
    reviews_from_critics = db.FloatField(required=True)
    colors = db.ListField(required=True)
    faces = db.FloatField(required=True)

    meta = {'collection': 'movies'}
