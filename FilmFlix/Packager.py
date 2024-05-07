import json
from .CustomList import CustomList

def serializeObjects( Objs ):
    if isinstance( Objs, list ):
        statelessMoviesList = makeStatelessAndSerializable( Objs )
        return json.dumps( statelessMoviesList )
    elif isinstance( Objs, object ):
        Objs.__dict__.pop('_sa_instance_state')
        return json.dumps( Objs.__dict__ )
    
    
def makeStatelessAndSerializable( objArr ):
    serializables = []
    for item in objArr:
        item.__dict__.pop('_sa_instance_state')
        statelessDict = item.__dict__
        # CustomList.addCountListCount( statelessDict ) if addCount else None
        serializables.append( statelessDict )
    print(objArr)
    return serializables
