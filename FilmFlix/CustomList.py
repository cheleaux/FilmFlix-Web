from .Models import db
from sqlalchemy.orm.attributes import flag_modified
from sqlalchemy.sql import text


class CustomList( db.Model ):
    __tablename__ = "lists"
    list_id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    name = db.Column(db.String(250), nullable=False) 


    def __init__( self, name, movieIDs = [] ):
        self.name = name
        self.movieIDs = movieIDs
        self.movie_count = len( movieIDs )


    def insertList( self ):
        db.session.add( self )
        db.session.commit()


    @staticmethod
    def removeList( listID ):
        CustomList.query.filter_by(list_id= int(listID)).delete()
        db.session.commit()


    @staticmethod
    def fetchListMeta():
        customLists = CustomList.query.all()
        return customLists


    @staticmethod
    def getListMembers( listID ):
        query = f'''
                SELECT m.*
                FROM movies m
                JOIN jsonb_array_elements(lists->'list_ids') x ON x ->> 0 = '{str(listID)}'
        '''
        movies = db.session.execute( text( query ) ).fetchall()
        return movies


    @staticmethod
    def addCountListCount( list ):
        listCount = CustomList.getListMemberCount( list.list_id )
        list['count'] = listCount


    @staticmethod
    def getListMemberCount( listID ):
        query = f'''
                WITH vmt AS (
                    SELECT x ->> 0 AS l_ids
                    FROM movies, jsonb_array_elements(lists->'list_ids') x)
                SELECT COUNT(l_ids) FROM vmt
                WHERE l_ids = '{str(listID)}' 
        '''
        count = db.session.execute(text(query)).first()[0]
        return count