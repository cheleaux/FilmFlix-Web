import json


# def makeMovieDict( data ):
#     if isinstance( data, list ):
#         movies = []
#         for item in data:
#             movie = Movie.initFromObj( item )
#             movies.append( movie.__dict__ )
#         return movies
#     else:
#         movie = Movie.initFromObj( data )
#         return movie.__dict__
    
# def makeListDict( data ):
#     if isinstance(data, list):
#         customLists = []
#         for item in data:
#             customList = CustomList.initFromObj( item )
#             customLists.append( customList.__dict__ )
#         return customLists
#     else:
#         customList = CustomList.initFromObj( item )
#         return customList

def serializeObjects( Objs ):
    if isinstance( Objs, list ):
        movies = []
        for item in Objs:
            movies.append( item.toJSON() )
        return json.dumps( movies )
    elif isinstance( Objs, object ):
        movie = item.toJSON()
        return movie