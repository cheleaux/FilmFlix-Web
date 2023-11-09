from .Movie import Movie
import sqlite3 as sql


def getMovies( allMovies ):
    return fetchMovieJSON( allMovies )

def fetchMovieJSON( movies ):
    movieList = []
    for item in movies:
        (id, title, release, rating, duration, genre) = item
        newMovie = Movie(id, title, release, rating, duration, genre)
        movieList.append(newMovie.__dict__)
    return movieList


if __name__ == '__main__':
    getMovies()