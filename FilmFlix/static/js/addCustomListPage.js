import MovieSelector from './movieSelector.js'

export function initialiseMovieSelector(){
    const movieSelectorEl = document.querySelector('.movie-selector-section')
    const movieSelector = new MovieSelector( movieSelectorEl )
    return movieSelector
}

export function onLoadPageBuffer( movieSelector ){
    movieSelector.register.addEvenetListener( 'click', movieSelector.handleMovieSelection() )
    movieSelector.searchbar.addEvenetListener( 'keyUp', movieSelector.searchRegister() )
}