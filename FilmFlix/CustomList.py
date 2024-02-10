
class CustomList:
    def __init__(self, Id, name, quantity ):
        self.Id = Id
        self.name = name
        self.quantity = quantity

    def initFromObj( obj ):
        Id = obj.list_id
        quantity = obj.movie_count
        name = obj.name
        newInstance = CustomList( Id, name, quantity )
        return newInstance
        
 