from flask import Response
from .TouchDB import *
from .Packager import *
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

def fetchMovies( param ):
    if 'listID' in param.keys():
        movieList = fetchMoviesFromList( param['listID'] )
    elif 'query' in param.keys():
        movieList = fetchMoviesFromSearch( param['query'] )
    movieJson = json.dumps( makeMovieDict( movieList ))
    return movieJson

def fetchAllCustomListDetails():
    allLists = fetchListMeta()
    listJson = json.dumps( makeListDict( allLists ) )
    res = Response( listJson, 200, mimetype='application/json' )
    return res

def createCustomList( listDetails ):
    insertList( listDetails )
    listID = getID( { 'name': listDetails.get('name') } )
    print(f'Custom List ID is { listID }')
    createMovietoListRelation( listID, listDetails.get( 'movieIDs' ) )
    res = Response( f'New cutsom list { listID }', 201, mimetype='text/plain')
    return res

def DEVaddDummyData():
    movieIDs = [17, 36, 21, 29, 15, 7, 20]
    instateListMembership( 10, movieIDs )