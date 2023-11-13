from flask import Blueprint, render_template, request
from .Routes import *


views = Blueprint('views', __name__)

@views.route( '/' )
def home():
    return render_template('home.html')

@views.route( '/api/movies' )
def movieList():
    query = request.args.get('query') if request.args else None
    return render_template( 'movieList.html', movies=fetchMovieList( query ) )

@views.route( '/api/add-movie', methods=['GET', 'POST'] )
def AddMovie():
    if request.method == 'GET':
        return render_template( 'addMovie.html' )
    elif request.method == 'POST':
        return respondToPOST( request.json )
    
@views.route( '/api/movies/<movieId>' )
def selectMovie( movieId ):
    if request.method == 'GET':
        return render_template( 'addMovie.html', details=fetchMovieDetails( movieId ) )
    # elif request.method == 'UPDATE':
    #     changeMovieDetails( movieId )
    # elif request.method == 'DELETE':
    #     removeMovie( movieId )