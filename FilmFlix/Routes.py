from flask import Response
from .Movie import Movie
from .CustomList import CustomList
from .Packager import *
from .Utils import getID, fetchMoviesBasedOnParams
from sqlalchemy import inspect


def movieInsertResponder( movieDetails ):
    movie = Movie( movieDetails['title'], movieDetails['yearReleased'], movieDetails['rating'], movieDetails['duration'], movieDetails['genre'] )
    movie.insertMovie()
    movieID = getID( { 'title': movieDetails['title'] } )
    res = Response( f'New movie record { movieID }', 201, mimetype='text/plain' )
    return res


def movieDeletionResponder( movieID ):
    res = Response( f'Deleted movie record { movieID }', 204, mimetype='text/plain' )
    Movie.removeMovie( movieID )
    return res


def movieUpdateResponder( movieDetails ):
    res = Response( f'Updated movie record { movieDetails["id"] }', 201, mimetype='text/plain' )
    Movie.updateMovieDetails( movieDetails )
    return res
        
        
def customListInsertResponder( listDetails ):
    customList = CustomList( listDetails['name'], listDetails['movieIDs'] )
    customList.insertList()
    listID = getID( { 'name': listDetails['name'] } )
    Movie.instateListMembership( listID, listDetails['movieIDs'] )
    res = Response( f'New custom list record { listID }', 201, mimetype='text/plain')
    return res


def customListDeleteResponder( listID ):
    res = Response( f'Delete movie record { listID }', 204, mimetype='text/plain' )
    CustomList.removeList( listID )
    return res


def fetchMovieDetails( ID ):
    movie = Movie.fetchMovieByID( ID )
    movieJson = serialiseObjects( movie )
    return movieJson


def fetchMovies( param ):
    movies = fetchMoviesBasedOnParams( param )
    devFunc()
    if movies != []:
        movieJson = serialiseObjects( movies )
        return movieJson
    else:
        return errorResponse( 'invalid listID', 404 )


def fetchCustomListMenuDetails():
    customListMetaData = CustomList.fetchListMeta()
    listJson = serialiseObjects( customListMetaData )
    CustomList.setMovieCount( customListMetaData )
    res = Response( listJson, 200, mimetype='application/json' )
    return res


def errorResponse( errMessage, errCode ):
    res = Response( errMessage, errCode, mimetype='text/plain' )
    return res

def devFunc():
    inspectedClass = inspect(Movie)
    print(inspectedClass)