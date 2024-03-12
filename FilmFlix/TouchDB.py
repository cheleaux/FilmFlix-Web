from .Models import Movie, CustomList, db
from sqlalchemy.orm.attributes import flag_modified
from sqlalchemy.sql import text
from sqlalchemy import exc

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
    itemCount = listDetails['quantity']
    newList = CustomList( name, itemCount )
    db.session.add( newList )
    db.session.commit()


def removeList( listID ):
    CustomList.query.filter_by(list_id= int(listID)).delete()
    db.session.commit()


def fetchMoviesFromList( listID ):
    try:
        mvList = Movie.query.all()
        if listID:
            mvList = [ movie for movie in mvList if movie.lists and int(listID) in movie.lists['list_ids']  ]
        return mvList
    except exc.OperationalError.orig as err:
        print( err )
        print( 'Exception code: ', err.pgcode )


    
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
    customLists = CustomList.query.all()
    print( customLists )
    return customLists


def instateListMembership( listID, itemIDs ):
    for movieID in itemIDs:
        newListMember = Movie.query.filter_by(filmID=int(movieID)).first()
        if not newListMember:
            print(f'movie "{movieID}" not found 404')
            continue
        if listID not in newListMember.lists['list_ids']: 
            appendListIDToMemebershipRecord( newListMember, listID )


def appendListIDToMemebershipRecord( movie, listID ):
    movie.lists['list_ids'].append( listID )
    flag_modified(movie, 'lists')
    db.session.add(movie)
    db.session.commit()


def updateListMemberCount( listID ):
    count = getListMemberCount( listID )
    listToUpdate = CustomList.query.filter_by(list_id=listID).first()
    listToUpdate.movie_count = count
    flag_modified(listToUpdate, 'movie_count')
    db.session.add(listToUpdate)
    db.session.commit()


def getListMemberCount( listID ):
    query = f'''
                WITH vmt AS (
                    SELECT x ->> 0 AS l_ids
                    FROM movies, jsonb_array_elements(lists->'list_ids') x)
                SELECT COUNT(l_ids) FROM vmt
                WHERE l_ids = '{str(listID)}' '''
    count = db.session.execute(text(query)).first()[0]
    return count


def getID( ref ):
    if ref.__contains__('title'):
        ID = Movie.query.filter_by(title=ref['title']).first().filmID
    elif ref.__contains__('name'):
        ID = CustomList.query.filter_by(name=ref['name']).first().list_id
    return ID
