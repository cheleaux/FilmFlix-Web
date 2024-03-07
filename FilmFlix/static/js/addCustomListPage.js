import MovieSelector from './movieSelector.js'

function initialiseMovieSelector(){
    const movieSelectorEl = document.querySelector('.movie-selector-section')
    const movieSelector = new MovieSelector( movieSelectorEl )
    return movieSelector
}

function onLoadPageBuffer( movieSelector ){
    movieSelector.register.addEvenetListener( 'click', movieSelector.handleMovieSelection() )
    movieSelector.searchbar.addEvenetListener( 'input', movieSelector.searchRegister() )
}

export default { initialiseMovieSelector, onLoadPageBuffer }