from .Models import Movie, CustomList, db, CustomList
import json


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

# FIND A WAY TO STORE ARRAYS IN POSTGRES WITH MUTABILITY
def createMovietoListRelation( CustomListID, itemIDs ):
    for movieID in itemIDs:
        movie = Movie.query.filter_by(filmID=int(movieID)).first()
        listsColumnAsArr = json.loads(movie.lists) if movie.lists else None

        if not movie:
            print(f'movie "{movieID}" not found 404')
            continue
        
        if movie.lists and movieID not in listsColumnAsArr:
           listsColumnAsArr.append( CustomListID )
           movie.lists = json.dumps(listsColumnAsArr)
           print(movie.lists)
        elif not movie.lists:
            listsArr = []
            listsArr.append( CustomListID )
            movie.lists = json.dumps(listsArr)
        db.session.commit()
        print(movie.lists, f' this is the final log ')

def updateListQuantity( list_id ):
    Movie.query(Movie.lists).count(  )

def getID( ref ):
    if ref.__contains__('title'):
        ID = Movie.query.filter_by(title=ref['title']).first().filmID
    elif ref.__contains__('name'):
        ID = CustomList.query.filter_by(name=ref['name']).first().list_id
    return ID

# def DEVFetchMovieLists( movieID ):
#     movie = Movie.query.filter_by(filmID=movieID).first()
#     # movie.lists = 
#     # db.session.commit()
#     print(movie.lists)
