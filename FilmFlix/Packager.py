from .Movie import Movie
from .CustomList import CustomList
import sqlite3 as sql


def makeMovieDict( data ):
    if isinstance(data, list):
        movieList = []
        for item in data:
            movie = Movie.initFromObj(item)
            movieList.append( movie.__dict__ )
        return movieList
    else:
        movie = Movie.initFromObj(data)
        return movie.__dict__
    
def makeListDict( data ):
    if isinstance(data, list):
        customLists = []
        for item in data:
            customList = CustomList.initFromObj( item )
            customLists.append( customList.__dict__ )
        return customLists
    else:
        customList = CustomList.initFromObj( item )
        return customList