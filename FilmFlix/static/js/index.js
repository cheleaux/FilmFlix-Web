import search from './searchBar.js'
import addMovie from './addMovie.js'
import './movieList.js'

search.icon.addEventListener( 'click', search.initialiseSearch )

addMovie.form.addEventListener('click', addMovie.closeAndRedirect )