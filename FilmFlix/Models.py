from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Movie(db.Model):
    __tablename__ = "movies"
    filmID = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    yearReleased = db.Column(db.Integer, nullable=False)
    rating = db.Column(db.String(3), nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    genre = db.Column(db.String(50), nullable=False)
    lists = db.Column(db.String(250), nullable=True)

    def __init__(self, title, yearReleased, rating, duration, genre):
        self.title = str(title.title())
        self.yearReleased = int(yearReleased)
        self.rating = str(rating)
        self.duration = int(duration)
        self.genre = str(genre)

class CustomList(db.Model):
    __tablename__ = "lists"
    listid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    movieCount = db.Column(db.Integer, nullable=False)

    def __init__(self, name, count=0):
        self.name = name
        self.count = count

