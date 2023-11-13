from flask import Response
from .TouchDB import *
from .MovieList import *
from .Movie import Movie
import json


def respondToPOST( movie ):
    insertMovie( movie )
    movieID = queryDb( constructDBQuery( 'title', movie.get("title"), 'filmID' ) )[0][0]
    Response.status = '201'
    Response.location = f'/api/movies/{ movieID })'
    return Response

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

