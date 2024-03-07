import { fetchAllMovies } from './movie.js'
import Movie from './filter.js'

export default class MovieSelector {
    constructor( domElement ){
        this.domElement = domElement
        this.searchbar = this.domElement.querySelector('#movie-title-search')
        this.registerElement = this.domElement.querySelector('.movie-selector-register')
        this.allMovies = fetchAllMovies()
        this.collection = []
    }

    _populateRegister( definedMovieList = null ){
        try {
            const movieData = definedMovieList || this.allMovies
            Register.isEmpty( movieData ) ? this._NonFoundProtocol() : this._preInsertProtocol( movieData );
            this._insertMovies( movieData )
        } catch ( error ){
            console.log(`register error: ${ error } `)
        }
    }

    async fetchAllMovies(){
        const movies = await Movie.fetchAllMoviesJson()
        return movies
    }

    _NonFoundProtocol(){
        this._clearRegister()
        console.log('register empty')
    }

    _preInsertProtocol(){
        this._clearRegister()
    }

    _insertMovies( movies ){
        for(const item of movieData){
            const newMovie = new Movie( item.filmID, item.title, item.yearReleased, item.rating, item.duration, item.genre )
            activeRegister.insertAdjacentElement( 'beforeend',  activeRegister.classList.contains('movie-register') ? newMovie._constructCardItemHTML() : newMovie._constructListItemHTML() );
        }
    }

    _clearRegister(){
        if( registerElement.children || Array.from( registerElement.children ).length != 0 ) Array.from( registerElement.children ).forEach( elem => elem.remove() );
    }

    _searchRegister(){

    }

    _handleMovieSelection(){
        // WHEN CLICKED ON HIGHLIGHT THE CHOSEN MOVIE ELEMENT
        // THEN CHECK ALL 'selected' MOVIE ELEMENTS AND ADD THEM TO THE COLLECTION
    }
}