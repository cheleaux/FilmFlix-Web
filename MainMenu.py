from Checks import *


def menuStart( anchor ):

    menu = {
        'anchored': None,
        'optionList': ['1', '2', '3', '4', '5', '6'],
        'welcomeInpRequest': '\n\n-- Welcome to FilmFlix --\n\n-- Here you can access and manage all content details for your cinema screenings\n\n-- To get started please choose on of the options below using the number selectors:\n-----------\n\n1. Add a movie record\n\n2. Update movie record details\n\n3. Remove a movie record\n\n4. See all store movie details\n\n5. Make a report\n\n6. Exit\n\n---: ',
        'inpRequest': '\n\n\n-- Please choose on of the options below using the number selectors:\n-----------\n\n1. Add a movie record\n\n2. Update movie record details\n\n3. Remove a movie record\n\n4. See all store movie details\n\n5. Make a report\n\n6. Exit\n\n---: ',
    }

    if anchor:
         menu['anchored'] = True

    selection = int(getUserSelection( menu ))
    return selection

def getUserSelection( menu ):
    selector = input(menu['welcomeInpRequest']) if not menu['anchored'] else input(menu['inpRequest'])
    if selector not in menu['optionList']:
        selector = getvalidatedOption( selector, menu['inpRequest'], menu['optionList'] )
    return selector

if __name__ == '__main__':
        menuStart()