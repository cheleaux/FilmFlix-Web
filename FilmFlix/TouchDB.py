import sqlite3 as sql
from .Movie import Movie


def queryDb( dbQuery, params = None ):
    dbCon = sql.connect( r'filmflix.db' )
    dbCursor = dbCon.cursor()
    if params:
        dbCursor.execute( dbQuery, params )
    else: dbCursor.execute( dbQuery )
    return dbCursor.fetchall()

def effecDB( dbQuery, params = None ):
    dbCon = sql.connect( r'filmflix.db' )
    dbCursor = dbCon.cursor()
    if params:
        dbCursor.execute( dbQuery, params )
    else:
        dbCursor.execute( dbQuery )
    dbCon.commit()

def insertMovie( Details ):
    title, year, rating, duration, genre = Details.values()
    insert = Movie( None, title, year, rating, duration, genre )
    effecDB( 'INSERT INTO tblFilms VALUES ( NULL, ?, ?, ?, ?, ? )', ( insert.title, insert.yearReleased, insert.rating, insert.duration, insert.genre ) )

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