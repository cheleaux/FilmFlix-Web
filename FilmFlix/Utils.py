from .CustomList import CustomList
from .Movie import Movie


def getID( ref ):
    if ref.__contains__('title'):
        ID = Movie.query.filter_by( title=ref['title'] ).first().filmID
    elif ref.__contains__('name'):
        ID = CustomList.query.filter_by( name=ref['name'] ).first().list_id
    return ID

def fetchMoviesBasedOnParams( param ):
    if param[ list(param)[0] ] == None or param[ list(param)[0] ] == 'undefined':
        movies = Movie.fetchMoviesFromList( None )
    elif 'listID' in param.keys():
        movies = Movie.fetchMoviesFromList( param['listID'] )
    elif 'query' in param.keys() and param['query'] != None:
        movies = Movie.fetchMoviesFromSearch( param['query'] )
    return movies