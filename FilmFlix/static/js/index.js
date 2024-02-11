import search from './searchBar.js'
import movieDetailsPage from './movieDetailsPage.js'
import MovieListPage from './movieListPage.js'


const isOnMovieListPage = (window.location.href.includes('movies') && !window.location.href.includes('movies/'))
const isOnMovieDetailsPage = ( window.location.href.includes('movies/'))
const isOnAddMoviePage = (window.location.href.includes('add-movie'))

search.icon.addEventListener( 'click', search.initialiseSearch )

if ( isOnMovieListPage ){
    var registerEl = document.querySelector('.movie-register-container')
    var register = MovieListPage.initialiseRegister( registerEl )
    const queries = {
        screenQuery770: window.matchMedia('(max-width: 770px)'),
        screenQuery1090: window.matchMedia('(max-width: 1090px)')
    }
    document.addEventListener( 'DOMContentLoaded', () => { MovieListPage.onLoadPageBuffer( register, queries ) })
    queries.screenQuery1090.addEventListener( 'change', () => { MovieListPage.formatPageFromQueryEvent( '1090', mediaWidth ) })
    queries.screenQuery770.addEventListener( 'change', () => { MovieListPage.formatPageFromQueryEvent( '770', mediaWidth ) })
}

if ( isOnAddMoviePage ){
    const formEl = document.querySelector('#insertForm')
    const form = movieDetailsPage.initialiseForm( formEl, 'insert' )
    form.domElement.addEventListener('click', ( e ) => { movieDetailsPage.lockAndSubmitForm( form, e ) } );
}
// STOP MOVIE LIST PAGE IMPORTS INTERUPTING DETAILS LOADING BECAUSE NOT NON-EXISTENT ELEMENTS - DYNAMIC IMPORTS?
if ( isOnMovieDetailsPage ){
    const formEl = document.querySelector('#insertForm')
    const form = movieDetailsPage.initialiseForm( formEl, 'update' )
    movieDetailsPage.displayMovieDetails( form )
    form.domElement.addEventListener( 'click', ( e ) => { movieDetailsPage.lockAndSubmitForm( form, e ) } )
}
