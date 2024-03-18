from .Models import db
from sqlalchemy.orm.attributes import flag_modified
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy import exc


class Movie(db.Model):
    __tablename__ = "movies"
    filmID = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    yearReleased = db.Column(db.Integer, nullable=False)
    rating = db.Column(db.String(3), nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    genre = db.Column(db.String(50), nullable=False)
    lists = db.Column(JSONB, nullable=False)


    def __init__(self, title, yearReleased, rating, duration, genre, lists = {} ):
        self.title = str(title.title())
        self.yearReleased = int(yearReleased)
        self.rating = str(rating)
        self.duration = int(duration)
        self.genre = str(genre)
        self.lists = lists


    def insertMovie( self ):
        db.session.add( self )
        db.session.commit()


    def updateMovieDetails( self, details ):
        ID, title, year, rating, duration, genre = details.values()
        self.title = title
        self.yearReleased = year
        self.rating = rating
        self.duration = duration
        self.genre = genre
        db.session.commit()


    def appendMemberListID( self, listID ):
        self.lists['list_ids'].append( listID )
        flag_modified( self, 'lists')
        db.session.add( self )
        db.session.commit()


    def removeMemberListID( self, listID ):
        self.lists['list_ids'].remove( listID )
        flag_modified( self, 'lists')
        db.session.add( self )
        db.session.commit()
            

    @staticmethod
    def removeMovie( movieID ):
        Movie.query.filter_by( filmID=movieID ).delete()
        db.session.commit()
    
    
    @staticmethod
    def fetchMoviesFromSearch( query ):
        if query.isdigit():
            mvList = Movie.query.filter_by(yearReleased=query).all()
        else:
            mvList = Movie.query.filter( Movie.title.like(f"%{query.title().strip()}%")).all()
        return mvList


    @staticmethod
    def fetchMovieByID( movieID ):
        mvDetails = Movie.query.filter_by( filmID=movieID ).first()
        return mvDetails


    @staticmethod
    def fetchMoviesFromList( listID ):
        try:
            mvList = Movie.query.all()
            if listID:
                mvList = [ movie for movie in mvList if movie.lists and int(listID) in movie.lists['list_ids']  ]
            return mvList
        except exc.OperationalError.orig as err:
            print( err )
            print( 'Exception code: ', err.pgcode )


    @staticmethod       
    def instateListMembership( listID, itemIDs ):
        for movieID in itemIDs:
            listMember = Movie.query.filter_by( filmID=int( movieID )).first()
            if not listMember:
                print(f'movie "{ movieID }" not found 404')
                continue
            if listID not in listMember.lists['list_ids']: 
                listMember.appendMemberListID( listID )


    @staticmethod
    def severListMembership( listID, itemIDs ):
        for movieID in itemIDs:
            listMember = Movie.query.filter_by( filmID=int( movieID )).first()
            if not listMember:
                print(f'movie "{ movieID }" not found 404')
            if listID in listMember.lists['list_ids']:
                listMember.removeMemberListID( listID )