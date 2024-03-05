from flask import Response
from .TouchDB import *
from .Packager import *


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
    movie = fetchMovieByID( ID )
    movieJson = serializeObjects( movie )
    return movieJson


def fetchMovies( param ):
    movies = fetchMoviesBasedOnParams( param )
    if movies != []:
        movieJson = serializeObjects( movies )
        return movieJson
    else:
        return errorResponse( 'invalid listID', 404 )


def fetchCustomListMemuDetails():
    allCustomLists = fetchListMeta()
    listJson = serializeObjects( allCustomLists )
    res = Response( listJson, 200, mimetype='application/json' )
    return res


def createCustomList( listDetails ):
    insertList( listDetails )
    listID = getID( { 'name': listDetails.get('name') } )
    instateListMembership( listID, listDetails.get('movieIDs') )
    res = Response( f'New cutsom list { listID }', 201, mimetype='text/plain')
    return res


def fetchMoviesBasedOnParams( param ):
    if param[list(param)[0]] == None or param[list(param)[0]] == 'undefined':
        movies = fetchMoviesFromList( None )
    elif 'listID' in param.keys():
        movies = fetchMoviesFromList( param['listID'] )
    elif 'query' in param.keys() and param['query'] != None:
        movies = fetchMoviesFromSearch( param['query'] )
    return movies


def errorResponse( errMessage, errCode ):
    res = Response( errMessage, errCode, mimetype='text/plain' )
    return res