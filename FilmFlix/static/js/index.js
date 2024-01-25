import search from './searchBar.js'
import addMovie from './addMovie.js'
import updateMovie from './updateMovie.js'
import MovieList from './movieList.js'
import CustomListMenu from './listsMenu.js '

const isOnMovieListPage = (window.location.href.includes('movies') && !window.location.href.includes('movies/'))
const isOnMovieDetailsPage = ( window.location.href.includes('movies/'))
const isOnAddMoviePage = (window.location.href.includes('add-movie'))
const screenWidth1180 = window.matchMedia('(max-width: 1180px)')

search.icon.addEventListener( 'click', search.initialiseSearch )


if ( isOnMovieListPage ){
    document.addEventListener( 'DOMContentLoaded', () => ( MovieList.populateTable() ) )
    MovieList.movieTbl.addEventListener( 'click', MovieList.enableMovieActionsMenu )
    CustomListMenu.renderListMenu()
    CustomListMenu.CustomListMenuEl.addEventListener( 'click', CustomListMenu.displayListResults )
    screenWidth1180.addEventListener( 'change', MovieList.setMovieListFormat )
}

if ( isOnAddMoviePage ) addMovie.form.addEventListener('click', addMovie.lockAndSubmitForm );

if ( isOnMovieDetailsPage ){
    updateMovie.displayMovieDetails()
    updateMovie.form.addEventListener( 'click', updateMovie.lockAndSubmitForm )
}
