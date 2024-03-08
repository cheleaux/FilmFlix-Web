import MovieSelector from './movieSelector.js'

function initialiseMovieSelector(){
    const movieSelectorEl = document.querySelector('.movie-selector-section')
    const movieSelector = new MovieSelector( movieSelectorEl )
    return movieSelector
}

function onLoadPageBuffer( movieSelector ){
    movieSelector._populateRegister()
    movieSelector.registerElement.addEventListener( 'click', movieSelector._handleMovieSelection )
    movieSelector.searchbar.addEventListener( 'input', movieSelector._searchRegister )
}

export default { initialiseMovieSelector, onLoadPageBuffer }