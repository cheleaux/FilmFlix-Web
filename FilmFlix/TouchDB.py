from .Models import Movie, db


def insertMovie( details ):
    title, year, rating, duration, genre = details.values()
    movie = Movie(title, year, rating, duration, genre)
    db.session.add(movie)
    db.session.commit()

def updateMovieDetails( details ):
    ID, title, year, rating, duration, genre = details.values()
    movieToUpdate = Movie.query.fitler_by(filmID=ID).first()
    movieToUpdate.title = title
    movieToUpdate.yearReleased = year
    movieToUpdate.rating = rating
    movieToUpdate.duration = duration
    movieToUpdate.genre = genre
    db.session.commit()

def removeMovie( ID ):
    Movie.query.filter_by(filmID=ID).delete()
    db.session.commit()
 
def fetchMoviesFromSearch( query ):
    if query:
        list = Movie.query.filter_by( yearReleased=query ).all() if query.isdigit() else Movie.query.filter( Movie.title.like( f'%{query.title().strip()}%' )).all()
    else:
        list = Movie.query.all()
    return list

def fetchMoviesFromID( movieID ):
    details = Movie.query.filter_by(filmID=movieID).first()
    return details

# def formatCondition( value, expressionType = 'primative' ):
#     if str( value ).isdigit():
#         return value
#     elif expressionType == 'regex':
#         return f"%{ value.strip() }%"
#     else:
#         return f'"{ value.strip() }"'
    






# def updateMovieDetails( details ):
#     ID, title, year, rating, duration, genre = details.values()
#     updated = Movie( ID, title, year, rating, duration, genre )
#     dbQuery = f'UPDATE tblFilms SET title = "{ updated.title }", yearReleased = { updated.yearReleased }, rating = "{ updated.rating }", duration = { updated.duration }, genre = "{ updated.genre }" WHERE filmID = { updated.id }'
#     effectDB( dbQuery )

# def insertMovie( details ):
#     title, year, rating, duration, genre = details.values()
#     insert = Movie( None, title, year, rating, duration, genre )
#     effectDB( 'INSERT INTO tblFilms VALUES ( NULL, ?, ?, ?, ?, ? )', ( insert.title, insert.yearReleased, insert.rating, insert.duration, insert.genre ) )

# def constructDBQuery( column = None, condition = None, field = '*' ):
#     if condition:
#         validCondition = formatCondition( condition, 'regex' )
#         query = f'SELECT { field } FROM tblFilms WHERE like( { validCondition } , { column })'
#     else:
#         query = f'SELECT * FROM tblFilms'
#     return query

# def queryDb( dbQuery, params = None ):
#     dbCon = sql.connect( r'filmflix.db' )
#     dbCursor = dbCon.cursor()
#     if params:
#         dbCursor.execute( dbQuery, params )
#     else: dbCursor.execute( dbQuery )
#     return dbCursor.fetchall()

# def effectDB( dbQuery, params = None ):
#     dbCon = sql.connect( r'filmflix.db', isolation_level=None )
#     dbCursor = dbCon.cursor()
#     if params:
#         dbCursor.execute( dbQuery, params )
#     else:
#         dbCursor.execute( dbQuery )