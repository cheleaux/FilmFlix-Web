import search from './searchBar.js'
import addMovie from './addMovie.js'
import updateMovie from './updateMovie.js'
import MovieList from './movieList.js'
import CustomListMenu from './listsMenu.js '


search.icon.addEventListener( 'click', search.initialiseSearch )

if ( window.location.href.includes('movies') && !window.location.href.includes('movies/') ){
    MovieList.populateTable()
    MovieList.movieTbl.addEventListener( 'click', MovieList.handleMenuSelection )
    CustomListMenu.displayListMenu()
}

if ( window.location.href.includes('add-movie') ) addMovie.form.addEventListener('click', addMovie.lockAndSubmitForm );

if ( window.location.href.includes('movies/') ){
    updateMovie.displayMovieDetails()
    updateMovie.form.addEventListener( 'click', updateMovie.lockAndSubmitForm )
}
