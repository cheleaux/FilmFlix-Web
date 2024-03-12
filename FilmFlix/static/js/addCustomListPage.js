import MovieSelector from './movieSelector.js'

function initialiseMovieSelector(){
    const movieSelectorEl = document.querySelector('.movie-selector-section')
    const submitter = document.querySelector('#create-btn')
    const counter = document.querySelector('#quantity-value')   
    const movieSelector = new MovieSelector( movieSelectorEl, submitter, counter )
    return movieSelector
}

function onLoadPageBuffer( movieSelector ){
    movieSelector._populateRegister()
    movieSelector.registerElement.addEventListener( 'click', movieSelector._handleMovieSelection.bind( movieSelector ) )
    movieSelector.searchbar.addEventListener( 'input', movieSelector._searchRegister.bind( movieSelector ) )
    movieSelector.submitter.addEventListener( 'click',movieSelector._submitCollection.bind( movieSelector ) )
}

export default { initialiseMovieSelector, onLoadPageBuffer }