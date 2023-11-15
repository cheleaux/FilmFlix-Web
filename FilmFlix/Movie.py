import json
import sqlite3 as sql
class Movie:
    def __init__(self, mvId, mvTitle, yearReleased, rating, duration, genre):
        self.id = mvId
        self.title = mvTitle.title()
        self.yearReleased = yearReleased
        self.rating = rating
        self.duration = duration
        self.genre = genre
        
    def initFromObj( obj ):
        ID = obj.filmID
        title = obj.title
        year = obj.yearReleased 
        rating = obj.rating 
        duration = obj.duration 
        genre = obj.genre
        newInstance = Movie(ID, title, year, rating, duration, genre)
        return newInstance