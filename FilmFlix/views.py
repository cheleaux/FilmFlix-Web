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
    
@views.route( '/api/movies/<movieId>', methods=['GET', 'DELETE', 'PUT'] )
def selectMovie( movieId ):
    if request.method == 'GET':
        return render_template( 'addMovie.html', details=fetchMovieDetails( movieId ) )
    elif request.method == 'PUT':
        return respondToPUT( request.json )
    elif request.method == 'DELETE':
        return respondToDELETE( movieId )