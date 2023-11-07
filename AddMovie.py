from Connect import *
from Checks import *
from Context import *

def insertRecord(): 
    print('\n\n\n')
    
    insertion = {
        'movieTitle': input('Movie Title: ').title(),
        'releaseYear': int(input('Year Of Release: ')),
        'duration': int(input('Duration (minutes): ')),
        'rating': inputFromAvailible( 'rating' ),
        'genre': inputFromAvailible( 'genre' )
    }

    if confirmAction( insertion.values(), 'insert' ):
        processInsert( insertion.values() )
    else:
        print('\n\nInsert cancelled...')

def processInsert( insertion ):
    title, year, duration, rating, genre = insertion
    dbCursor.execute('INSERT INTO tblFilms VALUES ( NULL, ?, ?, ?, ?, ? )', ( title, year, rating, duration, genre ))
    dbCon.commit()
    print('Movie has been inserted...')

if __name__ == '__main__':
    insertRecord()