from flask import Response
from .TouchDB import *
from .MovieList import *
from .Movie import Movie
import json


def respondToPOST( movie ):
    insertMovie( movie )
    movieID = getMovieIdByTitle( movie.get('title') )
    res = Response( f'Deleted record { movieID }', 201, mimetype='text/plain' )
    return res

def respondToDELETE( movieID ):
    res = Response( f'Deleted record { movieID }', 204, mimetype='text/plain' )
    removeMovie( movieID )
    return res

def respondToPUT( movie ):
    res = Response( f'Updated record { movie["id"] }', 201, mimetype='text/plain' )
    updateMovieDetails( movie )
    return res
        
def fetchMovieDetails( ID ):
    details = fetchMovieByID( ID )
    movieID, title, release, rating, duration, genre = makeMovieDict( details ).values()
    movie = Movie( movieID, title, release, rating, duration, genre )
    movieJson = json.dumps( movie.__dict__ )
    return movieJson

def fetchMovieList( listName, query ):
    movieList = fetchMoviesFromSearch( query ) # use listName to create the list | custom list grabbing and search query dont run concurrently
    movieJson = json.dumps( makeMovieDict( movieList ))
    return movieJson
