import search from './searchBar.js'
import movieDetailsPage from './movieDetailsPage.js'
import MovieListPage from './movieListPage.js'
import addCustomListPage from './addCustomListPage.js'


const isOnMovieListPage = ( window.location.href.includes('movies') && !window.location.href.includes('movies/'))
const isOnMovieDetailsPage = ( window.location.href.includes('movies/') && !window.location.href.includes('add-movie') )
const isOnAddMoviePage = ( window.location.href.includes('add-movie') )
const isOnAddCustomList = ( window.location.href.includes('add-list') )

search.icon.addEventListener( 'click', search.initialiseSearch )

if ( isOnMovieListPage ){
    var register = MovieListPage.initialiseRegister()  // RETURNS INSTANTIATED REGISTER OBJECT WHERE 'domELement' IS THE MOVIE REGISTER CONTAINER
    var sidebar = MovieListPage.initialiseSidebar()  // RETURNS INSTANTIATED SIDEBAR OBJECT WHERE 'domELement' IS THE SIDEBAR MENU CONTAINER
    var queries = MovieListPage.fetchFunctionalScreenBreakpointQueries()  // RETURNS OBJECT OF MEDIA QUERY OBJECTS KEYED BY QUERY WIDTH
    document.addEventListener( 'DOMContentLoaded', () => { MovieListPage.onLoadPageBuffer( register, sidebar, queries ) })
    queries.screenQuery1090.addEventListener( 'change', () => { MovieListPage.formatPageFromQueryEvent( '1090', queries, register, sidebar ) })
    queries.screenQuery770.addEventListener( 'change', () => { MovieListPage.formatPageFromQueryEvent( '770', queries, register, sidebar ) })
}

if ( isOnAddMoviePage ){
    const formEl = document.querySelector('#insertForm')
    const form = movieDetailsPage.initialiseForm( formEl, 'insert' ) // INITITALISED WITH THE DOM ELEMENT IN index.js SO THAT THA PAGE OPERATION CAN BE SPECIFIED
    form.domElement.addEventListener('click', ( e ) => { movieDetailsPage.lockAndSubmitForm( form, e ) } );
}

if ( isOnAddCustomList ){
    const movieSelector = addCustomListPage.initialiseMovieSelector()
    const submitter = document.querySelector('#create-btn')
    document.addEventListener( 'DOMContentLoaded', addCustomListPage.onLoadPageBuffer( movieSelector, submitter ) )
}

if ( isOnMovieDetailsPage ){
    const formEl = document.querySelector('#insertForm')
    const form = movieDetailsPage.initialiseForm( formEl, 'update' ) // INITITALISED WITH THE DOM ELEMENT IN index.js SO THAT THA PAGE OPERATION CAN BE SPECIFIED
    movieDetailsPage.displayMovieDetails( form )
    form.domElement.addEventListener( 'click', ( e ) => { movieDetailsPage.lockAndSubmitForm( form, e ) } )
}


