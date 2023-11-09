from flask import Blueprint, render_template, request
from .MovieList import getMovies
import sqlite3 as sql
import json



views = Blueprint('views', __name__)

@views.route( '/' )
def home():
    return render_template('home.html')

@views.route( '/api/movies' )
def movieList():

    dbCon = sql.connect( r'filmflix.db' )
    dbCursor = dbCon.cursor()

    dbQuery = 'SELECT * FROM tblFilms '  ## intentional string whitespace for valid query
    
    if request.args.get( 'query' ):
        reqQuery = request.args.get( 'query' )
        condition = formatByType( reqQuery, 'regex' )
        dbQuery += f'WHERE like( {condition}, yearReleased )' if reqQuery.isdigit() else f'WHERE like( {condition}, title )'
        dbCursor.execute( dbQuery ) 
    else:
        dbCursor.execute( dbQuery.strip() )
    
    payload = json.dumps( getMovies( dbCursor.fetchall() ))

    return render_template( 'movieList.html', movies = payload )

@views.route( '/add-movie', methods=['GET', 'POST'] )
def AddMovie():
    return render_template('addMovie.html')




def formatByType( value, expressiontype = 'primative' ):
    if str( value ).isdigit():
        return value
    elif expressiontype == 'regex':
        return f'"%{ value.strip() }%"'
    else:
        return f'"{ value.strip() }"'