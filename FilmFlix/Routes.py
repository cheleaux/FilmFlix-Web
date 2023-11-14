from flask import Response
from datetime import date
from .TouchDB import *
from .MovieList import *
from .Movie import Movie
import json


def respondToPOST( movie ):
    insertMovie( movie )
    movieID = queryDb( constructDBQuery( 'title', movie.get("title"), 'filmID' ) )[0][0]
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
    details = fetchMoviesFromID( ID )
    movieID, title, release, rating, duration, genre = details
    movie = Movie( movieID, title, release, rating, duration, genre )
    movieJson = json.dumps( movie.__dict__ )
    return movieJson

def fetchMovieList( query ):
    movieList = fetchMoviesFromSearch( query )
    movieJson = json.dumps( makeMoviesFromList( movieList ))
    return movieJson
