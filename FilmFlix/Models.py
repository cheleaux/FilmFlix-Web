from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Movie(db.Model):
    __tablename__ = 'movies'
    filmID = db.Column( db.Integer, primary_key=True)
    title = db.Column( db.String(150), nullable=False )
    yearReleased = db.Column( db.Integer, nullable=False)
    rating = db.Column( db.String(3), nullable=False)
    duration = db.Column( db.Integer, nullable=False)
    genre = db.Column( db.String(50), nullable=False)

    def __init__( self, title, yearReleased, rating, duration, genre ):
        self.title = str(title.title())
        self.yearReleased = int(yearReleased)
        self.rating = str(rating)
        self.duration = int(duration)
        self.genre = str(genre)
