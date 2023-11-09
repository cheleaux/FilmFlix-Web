from Checks import *

def inputFromAvailible( column ):
    query = f'SELECT DISTINCT { column } FROM tblFilms'
    dbCursor.execute( query )
    results = dbCursor.fetchall()
    inputString = f'\nPlease select a { "year of release" if column == "yearReleased" else column } from following options:\n-----------'
    checkList = []

    for item in results:
        counter = results.index(item)+1
        itemString = item[0] if isinstance( item[0], str ) else str(item[0])
        listItem = f'\n{ str( counter ) }. { itemString }'
        inputString += listItem
        checkList.append(itemString)

    optionList = list(map(lambda x: str(x), range(1,len(checkList)+1)))
    selector = input(f'{ inputString }\n\n---: ')
    if selector not in optionList:
        selector = getvalidatedOption( selector, f'{ inputString }\n\n---: ', optionList )

    value = checkList[int(selector)-1]
    return value


    
    
