from .Models import Movie, db


def insertMovie(details):
    title, year, rating, duration, genre, lists = details.values()
    movie = Movie(title, year, rating, duration, genre, lists)
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

def fetchMoviesFromList( listName ):
    mvList = Movie.query.all()
    if listName != 'all':
        mvList = [ movie for movie in mvList if listName in movie.__dict__['lists'] ]
    return mvList
        
def fetchMoviesFromSearch(query):
    mvList = (
        Movie.query.filter_by(yearReleased=query).all()
        if query.isdigit()
        else Movie.query.filter(
            Movie.title.like(f"%{query.title().strip()}%")
        ).all()
    )
    print(mvList[1].__dict__)
    return mvList


def fetchMovieByID(movieID):
    mvDetails = Movie.query.filter_by(filmID=movieID).first()
    return mvDetails


def getMovieIdByTitle(title):
    ID = Movie.query.filter_by(title=title).first().filmID
    return ID

def devTestPrint():
    print(Movie.lists)