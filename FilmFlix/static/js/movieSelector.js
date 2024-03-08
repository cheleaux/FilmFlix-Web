import Movie from './movie.js'
import { fetchAllMovies } from './movie.js'
import { filterRegisterByTitle } from './filter.js'

export default class MovieSelector {
    constructor( domElement ){
        this.domElement = domElement
        this.searchbar = this.domElement.querySelector('#movie-title-search')
        this.registerElement = this.domElement.querySelector('.movie-selector-register')
        this.searchErrMsg = this.domElement.querySelector('.search-err-msg')
        this.allMovies = fetchAllMovies()
        this.collection = []
    }

    async _populateRegister( definedMovieList = null ){
        try {
            const movieData = definedMovieList || await this.allMovies
            movieData.length < 1 ? this._NonFoundProtocol() : this._preInsertProtocol( movieData );
            this._insertMovies( movieData )
        } catch ( error ){
            console.log(`register error: ${ error } `)
        }
    }

    _handleMovieSelection( e ){
        console.log( e.target )
    }

    _searchRegister(){
        const titleQuery = this.searchbar.value
        const queriedMovieList = filterRegisterByTitle( titleQuery )
        this._populateRegister( queriedMovieList )
    }

    async fetchAllMovies(){
        const movies = await fetchAllMovies()
        return movies
    }

    _NonFoundProtocol(){
        this._clearRegister()
        this.searchErrMsg.style.display = 'block'
    }

    _preInsertProtocol(){
        this._clearRegister()
        this.searchErrMsg.style.display = 'none'
    }

    _insertMovies( movies ){
        for(const item of movies){
            const newMovie = new Movie( item.filmID, item.title, item.yearReleased, item.rating, item.duration, item.genre )
            this.registerElement.insertAdjacentElement( 'beforeend',  newMovie._constructSelectorRegItem() );
        }
    }

    _clearRegister(){
        if( this.registerElement.children || Array.from( this.registerElement.children ).length != 0 ) Array.from( this.registerElement.children ).forEach( elem => elem.remove() );
    }

    _handleMovieSelection(){
        // WHEN CLICKED ON HIGHLIGHT THE CHOSEN MOVIE ELEMENT
        // THEN CHECK ALL 'selected' MOVIE ELEMENTS AND ADD THEM TO THE COLLECTION
    }
}