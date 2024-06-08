import json
from .CustomList import CustomList

def serialiseObjects( Objs ):
    if is_json( Objs ):
        return
    
    if isinstance( Objs, list ):
        statelessMoviesList = stateSerialisationPrep( Objs )
        return json.dumps( statelessMoviesList )
    elif isinstance( Objs, object ):
        Obj = Objs
        Obj.__dict__.pop('_sa_instance_state')
        return json.dumps( Objs.__dict__ )
    
    
def stateSerialisationPrep( objArr ):
    if not isinstance( objArr[1], dict ):
        serialisables = []
        for item in objArr:
            item.__dict__.pop('_sa_instance_state')
            statelessDict = item.__dict__
            serialisables.append( statelessDict )
        return serialisables


def is_json( item ):
    try:
        json.loads( item )
    except ValueError:
        return False
    except TypeError:
        return False
    return True