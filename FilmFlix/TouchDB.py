from .Models import Movie, CustomList, db


def insertMovie( details ):
    title, year, rating, duration, genre, lists = details.values()
    movie = Movie(title, year, rating, duration, genre, lists)
    db.session.add(movie)
    db.session.commit()


def updateMovieDetails( details ):
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


def InsertList( listDetails ):
    name = listDetails['name']
    IDs = listDetails['movieIDs']
    newList = CustomList( name, len( IDs ) )
    db.sesson.add(newList)
    db.session.commit()


def fetchMoviesFromList( listID ):
    mvList = Movie.query.all()
    if listID:
        mvList = [ movie for movie in mvList if listID in movie.__dict__['lists'] ]
    return mvList

    
def fetchMoviesFromSearch(query):
    if query.isdigit():
        mvList = Movie.query.filter_by(yearReleased=query).all()
    else:
        mvList = Movie.query.filter( Movie.title.like(f"%{query.title().strip()}%")).all()
    return mvList


def fetchMovieByID(movieID):
    mvDetails = Movie.query.filter_by(filmID=movieID).first()
    return mvDetails


def appendIDToItems( CustomListID, itemIDs ):
    for movieID in itemIDs:
        movie = Movie.query.filter_by(filmID=movieID).first()
        if movie.lists and movieID not in movie.list:
            movie.lists.append( CustomListID )
        elif not movie.lists:
            movie.lists = [].append( CustomListID )
    db.session.commit()

def getID( ref ):
    if ref['title']:
        ID = Movie.query.filter_by(title=ref['title']).first().filmID
    elif ref['name']:
        ID = CustomList.query.filter_by(title=ref['name']).first().filmID
    return ID

def devTestPrint():
    print(Movie.lists)