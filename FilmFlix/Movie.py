import json

class Movie:
    def __init__(self, id, title, yearReleased, rating, duration, genre):
        self.id = id
        self.title = title
        self.yearReleased = yearReleased
        self.rating = rating
        self.duration = duration
        self.genre = genre
    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, indent=4)
