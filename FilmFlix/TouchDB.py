import sqlite3 as sql
from .Movie import Movie


def queryDb( dbQuery, params = None ):
    dbCon = sql.connect( r'filmflix.db' )
    dbCursor = dbCon.cursor()
    if params:
        dbCursor.execute( dbQuery, params )
    else: dbCursor.execute( dbQuery )
    return dbCursor.fetchall()

def effectDB( dbQuery, params = None ):
    dbCon = sql.connect( r'filmflix.db', isolation_level=None )
    dbCursor = dbCon.cursor()
    if params:
        dbCursor.execute( dbQuery, params )
    else:
        dbCursor.execute( dbQuery )

def insertMovie( details ):
    title, year, rating, duration, genre = details.values()
    insert = Movie( None, title, year, rating, duration, genre )
    effectDB( 'INSERT INTO tblFilms VALUES ( NULL, ?, ?, ?, ?, ? )', ( insert.title, insert.yearReleased, insert.rating, insert.duration, insert.genre ) )

def updateMovieDetails( details ):
    ID, title, year, rating, duration, genre = details.values()
    updated = Movie( ID, title, year, rating, duration, genre )
    dbQuery = f'UPDATE tblFilms SET title = "{ updated.title }", yearReleased = { updated.yearReleased }, rating = "{ updated.rating }", duration = { updated.duration }, genre = "{ updated.genre }" WHERE filmID = { updated.id }'
    effectDB( dbQuery )

def removeMovie( ID ):
    dbQuery = f'DELETE FROM tblFilms WHERE filmID = { ID }'
    effectDB( dbQuery )
 
def fetchMoviesFromSearch( query ):
    if query:
        dbQuery = constructDBQuery( 'yearReleased', query ) if query.isdigit() else constructDBQuery( 'title', query )
        list = queryDb( dbQuery )   
    else:
        list = queryDb( constructDBQuery() )
    return list

def fetchMoviesFromID( movieID ):
    dbQuery = constructDBQuery( 'filmID', movieID )
    details = queryDb( dbQuery )[0]
    return details


def constructDBQuery( column = None, condition = None, field = '*' ):
    if condition:
        validCondition = formatCondition( condition, 'regex' )
        query = f'SELECT { field } FROM tblFilms WHERE like( { validCondition } , { column })'
    else:
        query = f'SELECT * FROM tblFilms'
    return query

def formatCondition( value, expressionType = 'primative' ):
    if str( value ).isdigit():
        return value
    elif expressionType == 'regex':
        return f'"%{ value.strip() }%"'
    else:
        return f'"{ value.strip() }"'