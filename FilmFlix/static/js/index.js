import search from './searchBar.js'
import addMovie from './addMovie.js'
import updateMovie from './updateMovie.js'
import Taskbar from './taskbar.js'
import MovieRegister from './register.js'
import customListMenu from './customListMenu.js'
import enableMovieActionsMenu from './menu.js'


const isOnMovieListPage = (window.location.href.includes('movies') && !window.location.href.includes('movies/'))
const isOnMovieDetailsPage = ( window.location.href.includes('movies/'))
const isOnAddMoviePage = (window.location.href.includes('add-movie'))

search.icon.addEventListener( 'click', search.initialiseSearch )


if ( isOnMovieListPage ){
    var registerEl = document.querySelector('.movie-register-container')
    var register = new MovieRegister( registerEl )
    document.addEventListener( 'DOMContentLoaded', () => {
        register._populateRegister( JSON.parse(register.domElement.dataset.movies) )
        Taskbar.setFormatIcon( register )
        customListMenu.renderListMenu()
    })
    register.domElement.addEventListener( 'click', ( e ) => { enableMovieActionsMenu( e, register ) } )
    Taskbar.domElement.addEventListener( 'click', ( e ) => { Taskbar.handleUserTask( e, register ) } )
    customListMenu.domElement.addEventListener( 'click', ( e ) => { customListMenu.displayListResults( e, register ) } )
}

if ( isOnAddMoviePage ) addMovie.form.addEventListener('click', addMovie.lockAndSubmitForm );

if ( isOnMovieDetailsPage ){
    updateMovie.displayMovieDetails()
    updateMovie.form.addEventListener( 'click', updateMovie.lockAndSubmitForm )
}
