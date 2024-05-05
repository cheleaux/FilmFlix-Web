import MovieRegister from './register.js'
import MenuInterface from './menu.js'
import Sidebar from './sidebar.js'
import { SidebarRefreshObserver, RegisterRefreshObserver } from './refreshObservers.js'
import { AlertObserver } from './alertObserver.js'


// TODO: INSTANCIATE INDIVIDUAL OBSERVERS AND SUBSCRIBE THEM TO THE HUB 



export function initialiseRegister( ObserverHub ){
    const registerElement = document.querySelector('.movie-register-container')
    const register = new MovieRegister( registerElement, ObserverHub )
    return register
}

export function initialiseSidebar(){
    const sidebarElement = document.querySelector('.page-menu')
    const sidebar = new Sidebar( sidebarElement )
    return sidebar
}

export function initialiseMenuInterface( ObserverHub, Register, Sidebar ){
    const Menus = new MenuInterface( ObserverHub, Register, Sidebar )
    return Menus
}

function intantiateAndSuscribePageObservers( ObserverHub ){
    const sidebarRefreshObserver = new SidebarRefreshObserver()
    const registerRefreshObserver = new RegisterRefreshObserver()
    const alertObserver = new AlertObserver()
    ObserverHub._subscribe( [ sidebarRefreshObserver, registerRefreshObserver, alertObserver ], 'movieDeleted' )
    ObserverHub._subscribe( [ sidebarRefreshObserver, alertObserver ], 'listDeleted' )
    ObserverHub._subscribe( [ registerRefreshObserver ],'rootMovieFetchChanged' )
    ObserverHub._subscribe( [ sidebarRefreshObserver ],'filterablesChanged' )    
    ObserverHub._subscribe( [ alertObserver ], 'movieFailedToDelete' )
    ObserverHub._subscribe( [ alertObserver ], 'listDFailedToDelete' )
}

export function fetchFunctionalScreenBreakpointQueries(){
    const screenQuery770 = window.matchMedia('(max-width: 770px)')
    const screenQuery1090 = window.matchMedia('(max-width: 1090px)')
    const queries = { screenQuery770, screenQuery1090 }
    return queries
}

export function onLoadPageBuffer( register, sidebar, ObserverHub, mediaQueries, Menus ){
    sidebar._formatAndRenderContent( register, mediaQueries )
    register._formatForScreenWidth( mediaQueries.screenQuery1090 )
    register._populateRegister( { rootFetch: true } )
    register.domElement.addEventListener( 'click', ( e ) => { Menus._enableMovieActionsMenu( e ) } )
    sidebar.domElement.addEventListener( 'click', ( e ) => { sidebar._handleUserAction( e, register, Menus ) } )
    intantiateAndSuscribePageObservers( ObserverHub )
}

export function formatPageFromQueryEvent( mediaWidth, mediaQueries, register, sidebar ){
    if( mediaWidth === '1090' ){
        register._formatForScreenWidth( mediaQueries.screenQuery1090 )
        sidebar._formatForScreenWidth( mediaQueries )
    } else if( mediaWidth === '770' ){
        sidebar._formatForScreenWidth( mediaQueries )
    }
}

