from colorimetry_detection.colorimetry_output import detect_colors
from faces_detection.faces_output import detect_faces
from flask import Blueprint, request
from ocr.ocr import getOcrInformation, getPercentageFromCategories
from regex import F
from src.models import Movie
from src.utils.response_type import Response

movies_route = Blueprint('movies_route', __name__)


@movies_route.route('/movies', methods=['GET'])
def get_movies_list():
    args = request.args
    year = args.get('year')
    per_page = args.get('per_page', 50)
    page = args.get('page', 1)

    movies = Movie.objects

    if (year):
        movies = Movie.objects(year=year)

    paginate_movies = movies.paginate(per_page=int(per_page), page=int(page))

    data = {
        "count": paginate_movies.total,
        "movies": paginate_movies.items
    }

    return Response(label='movies by id', data=data, code=200).get_res()


@movies_route.route('/movies/genres', methods=['GET'])
def get_movies_genres():
    args = request.args
    year = args.get('year')
    ocr = args.get('ocr')

    genresPipeline = agregateListFiled('genre') + [{'$group': {'_id': '$genre', 'count': {'$sum': 1}, 'movies_id': {'$addToSet': '$imdb_title_id'}}}, {
        '$sort': {'count': -1}}, {'$project': {'genre': '$_id', 'count': True, 'movies_id': True, '_id': False}}]

    if (year and year.isdigit()):
        genresPipeline.insert(0, {'$match': {'year': int(year)}})

    if (ocr):
        genresPipeline.insert(0, {'$match': {'colors': {'$exists': True}}})

    genresAgregation = Movie.objects().aggregate(genresPipeline, allowDiskUse=True)

    return Response(label='genres', data=list(genresAgregation), code=200).get_res()

@movies_route.route('/movies/genres_years', methods=['GET'])
def get_movies_genres_years():

    genresPipeline = agregateListFiled('year') + agregateListFiled('genre') + [
        {'$group':{
            '_id':'$year',
            'count':{'$sum':1},
            'movies_id':{'$addToSet':'$imdb_title_id'}
            }
        },
        {'$sort':{
            'count':-1}
        },
        {'$project':{
            'genre':'$_id',
            'count':True,
            'movies_id':True,
            '_id':False}}]


    print(genresPipeline)

    genresAgregation = Movie.objects().aggregate(genresPipeline, allowDiskUse=True)

    return Response(label='genres', data=list(genresAgregation), code=200).get_res()

@movies_route.route('/movies/years', methods=['GET'])
def get_movies_years():
    args = request.args
    genre = args.get('genre')
    ocr = args.get('ocr')

    yearsPipeline = [{'$group': {'_id': '$year', 'count': {'$sum': 1}, 'movies_id': {'$addToSet': '$imdb_title_id'}}}, {
        '$sort': {'count': -1}}, {'$project': {'year': '$_id', 'count': True, 'movies_id': True, '_id': False}}]
    if (genre):
        array = agregateListFiled('genre')
        array.append({'$match': {'genre': genre}})

        yearsPipeline = array + yearsPipeline

    if (ocr):
        yearsPipeline.insert(0, {'$match': {'colors': {'$exists': True}}})

    yearsAgregation = Movie.objects.aggregate(yearsPipeline, allowDiskUse=True)

    return Response(label='years', data=list(yearsAgregation), code=200).get_res()


@movies_route.route("/movies/countries", methods=['GET'])
def get_movies_countries():
    args = request.args
    year = args.get('year')
    genre = args.get('genre')
    ocr = args.get('ocr')

    countriesPipeline = agregateListFiled('country') + [{'$group': {'_id': '$country', 'count': {'$sum': 1}, 'movies_id': {'$addToSet': '$imdb_title_id'}}}, {
        '$sort': {'count': -1}}, {'$project': {'country': '$_id', 'count': True, 'movies_id': True, '_id': False}}]

    if (year and year.isdigit()):
        countriesPipeline.insert(0, {'$match': {'year': int(year)}})

    if (genre):
        array = agregateListFiled('genre')
        array.append({'$match': {'genre': genre}})

        countriesPipeline = array + countriesPipeline

    if (ocr):
        countriesPipeline.insert(0, {'$match': {'colors': {'$exists': True}}})

    countriesAgregation = Movie.objects.aggregate(
        countriesPipeline, allowDiskUse=True)

    return Response(label='countries', data=list(countriesAgregation), code=200).get_res()


@movies_route.route("/movies/languages", methods=['GET'])
def get_movies_languages():
    args = request.args
    year = args.get('year')
    genre = args.get('genre')
    ocr = args.get('ocr')

    languagesPipeline = agregateListFiled('language') + [{'$group': {'_id': '$language', 'count': {'$sum': 1}, 'movies_id': {'$addToSet': '$imdb_title_id'}}}, {
        '$sort': {'count': -1}}, {'$project': {'language': '$_id', 'count': True, 'movies_id': True, '_id': False}}]

    if (year and year.isdigit()):
        languagesPipeline.insert(0, {'$match': {'year': int(year)}})

    if (genre):
        array = agregateListFiled('genre')
        array.append({'$match': {'genre': genre}})

        languagesPipeline = array + languagesPipeline

    if (ocr):
        languagesPipeline.insert(0, {'$match': {'colors': {'$exists': True}}})

    languagesAgregation = Movie.objects.aggregate(
        languagesPipeline, allowDiskUse=True)

    return Response(label='languages', data=list(languagesAgregation), code=200).get_res()


@movies_route.route("/movies/production_companies", methods=['GET'])
def get_movies_production_companies():
    args = request.args
    year = args.get('year')
    genre = args.get('genre')
    language = args.get('language')
    ocr = args.get('ocr')

    production_companiesPipeline = agregateListFiled('production_company') + [{'$group': {'_id': '$production_company', 'count': {'$sum': 1}, 'movies_id': {
        '$addToSet': '$imdb_title_id'}}}, {'$sort': {'count': -1}}, {'$project': {'production_company': '$_id', 'count': True, 'movies_id': True, '_id': False}}]

    if (year and year.isdigit()):
        production_companiesPipeline.insert(0, {'$match': {'year': int(year)}})

    if (genre):
        array = agregateListFiled('genre')
        array.append({'$match': {'genre': genre}})

        production_companiesPipeline = array + production_companiesPipeline

    if (language):
        array = agregateListFiled('language')
        array.append({'$match': {'language': language}})

        production_companiesPipeline = array + production_companiesPipeline

    if (ocr):
        production_companiesPipeline.insert(
            0, {'$match': {'colors': {'$exists': True}}})

    production_companiesAgregation = Movie.objects.aggregate(
        production_companiesPipeline, allowDiskUse=True)

    return Response(label='production_companies', data=list(production_companiesAgregation), code=200).get_res()


@movies_route.route("/movies/years/genres", methods=['GET'])
def get_movies_years_genres():

    yearsGenresPipeline = [{'$addFields':{'genre':{'$split':['$genre',', ']}}},{'$unwind':{'path':'$genre'}},{'$group':{'_id':{'year':'$year','name':'$genre'},'count':{'$sum':1}}},{'$group':{'_id':{'year':'$_id.year','name':'$_id.name'},'counts':{'$push':{'count':'$count'}},'count':{'$sum':'$count'}}},{'$sort':{'_id.year':1}},{'$group':{'_id':'$_id.year','genres':{'$push':{'name':'$_id.name','count':'$count'}},'count':{'$sum':'$count'}}},{'$sort': {'_id': 1}},{'$project':{'year':'$_id','count':1,'genres':1,'_id':0}}]

    yearsGenresAgregation = Movie.objects.aggregate(yearsGenresPipeline, allowDiskUse=True)

    return Response(label='years_genres', data=list(yearsGenresAgregation), code=200).get_res()



@movies_route.route('/movie/<imdb_title_id>', methods=['GET'])
def get_movie_by_id(imdb_title_id):
    movie = Movie.objects.filter(imdb_title_id=imdb_title_id).first()

    return Response(label='movies by id', data=movie, code=200).get_res()


@movies_route.route('/movies/search', methods=['GET'])
def get_movies_by_title():
    args = request.args
    title = args.get('title', "").lower()

    movies = Movie.objects.filter(title__icontains=title).limit(10)

    return Response(label='movies by title', data=movies, code=200).get_res()

genres_labels = ['Action', 'Adventure', 'Animation', 'Biography','Comedy', 'Crime', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western']

@movies_route.route('/movies', methods=['POST'])
def get_movies_prediction_per_poster():
    data = request.get_json()
    base64 = data['base64']

    faces, predicted_faces, genres_faces = detect_faces(genres_labels, base64_data=base64)
    colors, predicted_colors, genres_colors = detect_colors(genres_labels, base64_data=base64)
    is_title_movie_lowest_part, is_containing_five_line_in_bottom, has_text_on_top = getOcrInformation(base64_data=base64)


    for index in range(len(genres_labels)):
        predicted_faces[index] = {'genre':genres_labels[index], 'percent': predicted_faces[index]*100 }
        predicted_colors[index] = {'genre':genres_labels[index], 'percent': predicted_colors[index]*100 }

    return Response(label='movies by title', data={'faces':{'number_faces':faces,'predicted_faces':predicted_faces,'genres_faces':genres_faces,},'colors':{'colors':colors,'predicted_colors':predicted_colors,'genres_colors':genres_colors},'ocr': {'titleLowestPart': int(is_title_movie_lowest_part), 'fiveLines': int(is_containing_five_line_in_bottom), 'textOnTop': int(has_text_on_top)},
        }
        , code=200).get_res()


@movies_route.route('/movies/ocr', methods=['GET'])
def get_genre_ocr():
    args = request.args
    genre = args.get('genre')

    percentage_is_title_movie_lowest_part, percentage_is_containing_five_line_in_bottom, percentage_has_text_on_top = getPercentageFromCategories(genre)

    return Response(label='movies by title', data={'lowestPart': percentage_is_title_movie_lowest_part,
    'fiveLines': percentage_is_containing_five_line_in_bottom, 'textTop': percentage_has_text_on_top}, code=200).get_res()

# Crée une agregation sur les champ avec des , ex: country: "Germany, Danemark"


def agregateListFiled(fieldName=""):

    return [
        {
            '$addFields': {
                fieldName: {
                    '$split': [
                        '$' + fieldName, ', '
                    ]
                }
            }
        }, {
            '$unwind': {
                'path': '$' + fieldName
            }
        }
    ]
