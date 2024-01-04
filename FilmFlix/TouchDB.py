from .Models import Movie, CustomList, db, CustomList
from sqlalchemy.orm.attributes import flag_modified
from sqlalchemy.sql import text
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

def instateListMembership( CustomListID, itemIDs ):
    for movieID in itemIDs:
        movie = Movie.query.filter_by(filmID=int(movieID)).first()

        if not movie:
            print(f'movie "{movieID}" not found 404')
            continue

        if CustomListID not in movie.lists['list_ids']:
            movie.lists['list_ids'].append( CustomListID )
            flag_modified(movie, 'lists')
            db.session.add(movie)
            # print(movie.lists)
        db.session.commit()
        # print(movie.lists, f' this is the final log ')

def updateListQuantity( listId ):
    query = f'''
                WITH vmt AS (
                    SELECT x ->> 0 AS l_ids
                    FROM movies, jsonb_array_elements(lists->'list_ids') x)
                SELECT COUNT(l_ids) FROM vmt
                WHERE l_ids = '{str(listId)}' '''
    quantity = db.session.execute(text(query)).first()[0]
    listToUpdate = CustomList.query.filter_by(list_id=listId).first()
    listToUpdate.movie_count = quantity
    flag_modified(listToUpdate, 'movie_count')
    db.session.add(listToUpdate)
    db.session.commit()

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