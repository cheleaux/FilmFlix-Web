from .Movie import Movie
import sqlite3 as sql


def makeMovieDict( data ):
    movieList = []
    if isinstance(data, list):
        for item in data:
            movie = Movie.initFromObj(item)
            movieList.append( movie.__dict__ )
        return movieList
    else:
        movie = Movie.initFromObj(data)
        return movie.__dict__