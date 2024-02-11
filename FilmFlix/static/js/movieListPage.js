import Taskbar from './taskbar.js'
import MovieRegister from './register.js'
import customListMenu from './customListMenu.js'
import enableMovieActionsMenu from './menu.js'
import Sidebar from './sidebar.js'


function initialiseRegister( domElement ){
    const register = new MovieRegister( domElement )
    return register
}

function onLoadPageBuffer( register, mediaQueries ){
    register._formatForScreenWidth( mediaQueries.screenQuery1090 )
    Sidebar.formatForScreenWidth( mediaQueries )
    register._populateRegister( JSON.parse(register.domElement.dataset.movies) )
    Taskbar.setFormatIcon( register )
    customListMenu.renderListMenu()
    register.domElement.addEventListener( 'click', ( e ) => { enableMovieActionsMenu( e, register ) } )
    Taskbar.domElement.addEventListener( 'click', ( e ) => { Taskbar.handleUserTask( e, register ) } )
    customListMenu.domElement.addEventListener( 'click', ( e ) => { customListMenu.displayListResults( e, register ) } )
}

function formatPageFromQueryEvent( mediaWidth, mediaQueries ){
    if( mediaWidth === '1090' ){
        register._formatForScreenWidth( mediaQueries.screenQuery1090 )
        Sidebar.formatForScreenWidth( mediaQueries )
    } else if( mediaWidth === '770' ){
        Sidebar.formatForScreenWidth( mediaQueries )
    }
}

export default { formatPageFromQueryEvent, onLoadPageBuffer, initialiseRegister };