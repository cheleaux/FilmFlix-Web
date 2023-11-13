import json
import sqlite3 as sql
class Movie:
    def __init__(self, mvId, mvTitle, yearReleased, rating, duration, genre):
        self.id = mvId
        self.title = str(mvTitle).title()
        self.yearReleased = int(yearReleased)
        self.rating = str(rating)
        self.duration = int(duration)
        self.genre = str(genre)

def devDeleteDB():
    dbCon = sql.connect( r'filmflix.db' )
    dbCursor = dbCon.cursor()
    dbCursor.execute('DELETE FROM tblFilms WHERE filmID = 37')
    dbCon.commit()

devDeleteDB()