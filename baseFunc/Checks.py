
def getvalidatedOption( selection, request, options = ['Y', 'N']):
    if selection == None:
        selection = input(request).upper()
    while selection not in options:
            print('\n\n--- Invalid Selection\n\n')
            selection = input(request).upper()
    return selection
# Todo: stop getValidatedOption from running twice 

def isConfirmed( selector ):
    if selector == 'Y':
        return  True
    if selector == 'N':
        return False

def confirmAction( details, action ):
    title, year, duration, rating, genre = details
    record = ' | '.join([title, str(year), (str(duration) + ' mins'), rating, genre])
    inpRequest = f'\nPlease confirm you wish to {action} the following (Y/N):\n-----------\n{ record }\n-----------\n---: '
    selector = getvalidatedOption( None, inpRequest )
    return isConfirmed( selector )