from flask import Flask, jsonify, request
import json
from flask_cors import CORS
import pickle
import os
import requests

def fetch_poster(movie_id):
   
    API_KEY = os.environ.get('API_KEY')
    url = "https://api.themoviedb.org/3/movie/{}?api_key={API_KEY}&language=en-US".format(movie_id)
    data = requests.get(url)
    data = data.json()
    poster_path = data['poster_path']
    full_path = "https://image.tmdb.org/t/p/w500/" + poster_path
    return full_path

def recommend(movie):
    index = movies[movies['title'] == movie].index[0]
    distances = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])
    recommended_movie_names = []
    recommended_movie_posters = []
    for i in distances[1:6]:
        # fetch the movie poster
        movie_id = movies.iloc[i[0]].movie_id
        recommended_movie_posters.append(fetch_poster(movie_id))
        recommended_movie_names.append(movies.iloc[i[0]].title)

    return recommended_movie_names, recommended_movie_posters

movies = pickle.load(open('movies.pkl', 'rb'))
similarity = pickle.load(open('recomendation_utility.pkl', 'rb'))

app = Flask(__name__)
CORS(app)

@app.route('/get_movie_list', methods=['GET'])
def get_movie_list():
    movie_list = movies['title'].values.tolist()
    return jsonify(movie_list)

@app.route('/get_recommendation', methods=['GET'])
def get_recommendation():
    selected_movie = request.args.get('movie')
    recommended_movie_names, recommended_movie_posters = recommend(selected_movie)
    response = {
        'recommended_movie_names': recommended_movie_names,
        'recommended_movie_posters': recommended_movie_posters
    }
    return jsonify(response)

