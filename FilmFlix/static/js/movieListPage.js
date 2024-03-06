import MovieRegister from './register.js'
import enableMovieActionsMenu from './menu.js'
import Sidebar from './sidebar.js'


export function initialiseRegister(){
    const registerElement = document.querySelector('.movie-register-container')
    const register = new MovieRegister( registerElement )
    return register
}

export function initialiseSidebar(){
    const sidebarElement = document.querySelector('.page-menu')
    const sidebar = new Sidebar( sidebarElement )
    return sidebar
}

export function fetchFunctionalScreenBreakpointQueries(){
    const screenQuery770 = window.matchMedia('(max-width: 770px)')
    const screenQuery1090 = window.matchMedia('(max-width: 1090px)')
    const queries = { screenQuery770, screenQuery1090 }
    return queries
}

export function onLoadPageBuffer( register, sidebar, mediaQueries ){
    sidebar._formatAndRenderContent( register, mediaQueries )
    register._formatForScreenWidth( mediaQueries.screenQuery1090 )
    register._populateRegister( JSON.parse(register.domElement.dataset.movies) )
    register.domElement.addEventListener( 'click', ( e ) => { enableMovieActionsMenu( e, register ) } )
    sidebar.domElement.addEventListener( 'click', ( e ) => { sidebar._handleUserAction( e, register ) } )
}

export function formatPageFromQueryEvent( mediaWidth, mediaQueries, register, sidebar ){
    if( mediaWidth === '1090' ){
        register._formatForScreenWidth( mediaQueries.screenQuery1090 )
        sidebar._formatForScreenWidth( mediaQueries )
    } else if( mediaWidth === '770' ){
        sidebar._formatForScreenWidth( mediaQueries )
    }
}