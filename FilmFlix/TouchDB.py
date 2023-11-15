from .Models import Movie, db


def insertMovie(details):
    title, year, rating, duration, genre = details.values()
    movie = Movie(title, year, rating, duration, genre)
    db.session.add(movie)
    db.session.commit()


def updateMovieDetails(details):
    ID, title, year, rating, duration, genre = details.values()
    movieToUpdate = Movie.query.filter_by(filmID=ID).first()
    movieToUpdate.title = title
    movieToUpdate.yearReleased = year
    movieToUpdate.rating = rating
    movieToUpdate.duration = duration
    movieToUpdate.genre = genre
    db.session.commit()


def removeMovie(ID):
    Movie.query.filter_by(filmID=ID).delete()
    db.session.commit()


def fetchMoviesFromSearch(query):
    if query:
        list = (
            Movie.query.filter_by(yearReleased=query).all()
            if query.isdigit()
            else Movie.query.filter(
                Movie.title.like(f"%{query.title().strip()}%")
            ).all()
        )
    else:
        list = Movie.query.all()
    return list


def fetchMovieByID(movieID):
    mvDetails = Movie.query.filter_by(filmID=movieID).first()
    return mvDetails


def getMovieIdByTitle(title):
    ID = Movie.query.filter_by(title=title).first().filmID
    return ID
