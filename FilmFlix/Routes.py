from flask import Response
from .TouchDB import *
from .MovieList import *
from .Movie import Movie
import json


def respondToMovieInsert( movie ):
    insertMovie( movie )
    movieID = getID( { 'title': movie.get('title') } )
    res = Response( f'Deleted record { movieID }', 201, mimetype='text/plain' )
    return res

def respondToMovieDelete( movieID ):
    res = Response( f'Deleted record { movieID }', 204, mimetype='text/plain' )
    removeMovie( movieID )
    return res

def respondToMovieUpdate( movie ):
    res = Response( f'Updated record { movie["id"] }', 201, mimetype='text/plain' )
    updateMovieDetails( movie )
    return res
        
def fetchMovieDetails( ID ):
    details = fetchMovieByID( ID )
    movieID, title, release, rating, duration, genre = makeMovieDict( details ).values()
    movie = Movie( movieID, title, release, rating, duration, genre )
    movieJson = json.dumps( movie.__dict__ )
    return movieJson

def fetchMovies( listID, query ):
    if query:
        movieList = fetchMoviesFromSearch( query )
    else:
        movieList = fetchMoviesFromList( listID )
    movieJson = json.dumps( makeMovieDict( movieList ))
    return movieJson

def createCustomList( listDetails ):
    devTestPrint()
    # insertList( listDetails )
    # listID = getID( { 'name': listDetails.get('name') } )
    # addMoviesToList( listID, listDetails.get( 'movieIDs' ) )
    res = Response( f'New cutsom list { listID }', 201, mimetype='text/plain')
    return res