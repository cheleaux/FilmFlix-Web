from Checks import *
import AddMovie, DeleteMovie, UpdateMovieDetails, PrintAllMovies, MainMenu, Report


anchored = True
firstIteration = True

def userQuit():
    global anchored
    anchored = False
    print('\n\nExiting FilmFlix...\n')

def exitOperation():
    print('\n\nOperation not functional')

operations = { 

        1: AddMovie.insertRecord,
        2: UpdateMovieDetails.updateMovieDetails, 
        3: DeleteMovie.deleteMovie,
        4: PrintAllMovies.printAllRecords,
        5: Report.generateReport,
        6: userQuit
        
    }

while anchored:
    moduleNum = MainMenu.menuStart( not(firstIteration) )
    if firstIteration == True: firstIteration = False
    operations[ moduleNum ]()