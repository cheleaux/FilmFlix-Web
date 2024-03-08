import Movie from './movie.js'
import { fetchAllMovies } from './movie.js'
import { filterRegisterByTitle } from './filter.js'

export default class MovieSelector {
    constructor( domElement, submitter, counter ){
        this.domElement = domElement
        this.submitter = submitter
        this.counter = counter
        this.searchbar = this.domElement.querySelector('#movie-title-search')
        this.registerElement = this.domElement.querySelector('.movie-selector-register')
        this.searchErrMsg = this.domElement.querySelector('.search-err-msg')
        this.allMovies = fetchAllMovies()
        this.collection = []
    }
    
    static isMovieSelected( movie ){
        return movie.classList.contains('selected')
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
        const selection = e.target.closest('.movie-reg-item')
        if( !selection ) console.error('Selection Error: not found');
        MovieSelector.isMovieSelected( selection ) ? this._deselectMovie( selection ) : this._selectMovie( selection );
        this.counter.innerHTML = this.collection.length
    }

    _deselectMovie( movie ){
        try {
            const idx = this.collection.indexOf( movie.id );
            if (idx > -1) this.collection.splice(idx, 1);
            movie.classList.remove('selected')
        } catch ( err ){
            console.log(`Selection Error: ${ err }`)
        }
    }

    _selectMovie( movie ){
        try {
            this.collection.push( movie.id );
            movie.classList.add('selected')

        } catch ( err ){
            console.log(`Selection Error: ${ err }`)
        }
    }

    _searchRegister(){
        const titleQuery = this.searchbar.value
        const queriedMovieList = filterRegisterByTitle( titleQuery )
        this._populateRegister( queriedMovieList )
    }

    _createCollecion(){
        console.log( this.collection )
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
}