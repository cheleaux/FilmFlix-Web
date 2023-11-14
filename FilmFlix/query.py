import sqlite3 as sql

dbCon = sql.connect( r'filmflix.db', isolation_level=None )
dbCursor = dbCon.cursor()

# dbCursor.execute('SELECT * FROM tblFilms')

dbCursor.execute('DELETE FROM tblFilms WHERE filmID = 37')


# for row in dbCursor.fetchall():
#     print(row)
