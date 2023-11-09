from Connect import *
from Checks import *
from Context import *

def updateMovieDetails():
    print('\n\n\n')
    tableColumns = { 0:'filmID', 1:'title', 2:'yearReleased', 3:'rating', 4:'duration', 5:'genre' }
    selectionClause = constructSeletionClause( tableColumns )
    dbCursor.execute(f'SELECT title, yearReleased, duration, rating, genre FROM tblFilms { selectionClause }')

    try:
        if confirmAction( dbCursor.fetchone(), 'update' ):
            setClause = constructSetClause( tableColumns )
            processUpdate( selectionClause, setClause )
        else:
            print('Item will not be updated')
    except TypeError:
        print('Item not found')

def constructSeletionClause( columns ):
    column = getSelectedRow( columns )
    selection = input(f'\nWhat is the { "movie ID" if column == "filmID" else "movie title" }: ')
    selectionClause = f'WHERE LIKE( { formatByType( selection, "regex" ) }, { column } )'
    return selectionClause

def constructSetClause( columns ):
    columnToUpdate = getSelectedColumn( columns )
    updateTo = getNewValue( columns, columnToUpdate)
    setClause = f'SET { columnToUpdate } = { updateTo }'
    return setClause

def processUpdate( selectClause, setClause ):
    updateQuery = f'UPDATE tblFilms { setClause } { selectClause }'
    dbCursor.execute(updateQuery)
    dbCon.commit()
    print('\n\nItem has been updated\n')

def getSelectedRow( columns ):
    print('\n\n')
    optionList = [ '1', '2' ]
    inpRequest = 'How will you select the movie you wish to modify?(Please select a number)\n-----------\n1. Movie ID\n2. Movie Title\n---: '
    selector = input(inpRequest)
    if selector not in optionList:
        selector = getvalidatedOption( selector, inpRequest, optionList )
    return columns[ int(selector)-1 ]

def getSelectedColumn( columns ):
    print('\n\n')
    optionList = [ '1', '2', '3', '4', '5' ]
    inpRequest = 'What details would you like to change?(Please select a number)\n-----------\n1. Movie Title\n2. Year of release\n3. Rating\n4. Duration\n5. Genre\n-----------\n---: '
    selector = input(inpRequest)
    if selector not in optionList:
        selector = getvalidatedOption( selector, inpRequest, optionList )
    return columns[int(selector)]

def getNewValue( columnList, selectedcolumn ):
    if selectedcolumn == columnList[3]:
        newValue = inputFromAvailible( columnList[3] )
    elif selectedcolumn == columnList[5]:
        newValue = inputFromAvailible( columnList[5] )
    else:
        newValue = input(f'\nWhat would you like to change the { "year of release" if selectedcolumn == "yearReleased" else selectedcolumn } to: ')    
    return formatByType( newValue )

if __name__ == '__main__':
    updateMovieDetails()