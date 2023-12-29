from .Models import Movie, CustomList, db, CustomList


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


def insertList( listDetails ):
    name = listDetails['name']
    itemCount = len( listDetails['movieIDs'] )
    newList = CustomList( name, itemCount )
    print(f'Custom list { listDetails["name"] } has been added')
    db.session.add(newList)
    db.session.commit()


def removeList( listID ):
    CustomList.query.filter_by(list_id= int(listID)).delete()
    db.session.commit()
    print('list has been deleted')


def fetchMoviesFromList( listID ):
    mvList = Movie.query.all()
    if listID:
        mvList = [ movie for movie in mvList if movie.lists and listID in movie.lists  ]
    return mvList

    
def fetchMoviesFromSearch( query ):
    if query.isdigit():
        mvList = Movie.query.filter_by(yearReleased=query).all()
    else:
        mvList = Movie.query.filter( Movie.title.like(f"%{query.title().strip()}%")).all()
    return mvList


def fetchMovieByID( movieID ):
    mvDetails = Movie.query.filter_by(filmID=movieID).first()
    return mvDetails

def fetchListMeta():
    CustomLists = CustomList.query.all()
    return CustomLists

def addMoviesToList( CustomListID, itemIDs ):
    for movieID in itemIDs:
        movie = Movie.query.filter_by(filmID=movieID).first()
        if movie.lists and movieID not in movie.lists:
            movie.lists.append( CustomListID )
        elif not movie.lists:
            movie.lists = []
            movie.lists.append( CustomListID )
    db.session.commit()

def getID( ref ):
    if ref.__contains__('title'):
        ID = Movie.query.filter_by(title=ref['title']).first().filmID
    elif ref.__contains__('name'):
        ID = CustomList.query.filter_by(name=ref['name']).first().list_id
    return ID

# def DevRemoveFromMovies( listID ):
#     movies = fetchMoviesFromList( listID )
#     for movie in movies:
#         movie.lists = None
#     db.session.commit()
#     print('delete complete')   
