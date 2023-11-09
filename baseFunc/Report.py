from Checks import *
from Connect import *
from Context import *
from tabulate import tabulate

def generateReport():
    data = getReportData()
    print('\n\n\n', tabulate(data, headers=['ID', 'Title', 'Year Released', 'Duration(mins)', 'Rating', 'Genre'],tablefmt='presto', numalign='left'), '\n\n')
    if input('Enter any key to continue...'): return

def getColumnSelection():
    optionList = [ '1', '2', '3', '4' ]
    columns = { 1:'yearReleased', 2:'rating', 3:'genre', 4: 'filmID' }
    
    inputText = '\nChoose a Report filter:\n-----------\n1. Year Of Release\n2. Rating\n3. Genre\n4. General report (no filter)\n----: '
    selector = input(inputText)
    if selector not in optionList:
        selector = getvalidatedOption( selector, inputText, optionList)

    column = columns[int(selector)]
    return column

def getReportData():
    column = getColumnSelection()
    condition = '%' if column == 'filmID' else inputFromAvailible( column )
    queryStr = f'SELECT * FROM tblFilms WHERE LIKE( ?, { column })'
    dbCursor.execute( queryStr, [ condition ])
    return dbCursor.fetchall()

if __name__ == '__main__':
    generateReport()