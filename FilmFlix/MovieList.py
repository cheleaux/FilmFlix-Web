from .Movie import Movie
import sqlite3 as sql


def makeMoviesFromList( data ):
    movieList = []
    for item in data:
        movie = dict(item.__dict__)
        del movie['_sa_instance_state']
        print( movie )
        movieList.append(movie)
    return movieList


if __name__ == '__main__':
    makeMoviesFromList()