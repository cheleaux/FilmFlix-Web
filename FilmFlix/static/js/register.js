import { getTaskbarDomElement, setFormatIcon } from './taskbar.js'
import Movie from './movie.js'
import Filter from './Filter.js'
import { Filterables } from './Filter.js'

export default class Register {
    constructor( domElement ){
        this.domElement = domElement
        this.listContent = []
        this.errMsg = domElement.querySelector('.err-not-found') || null
        this.activeRegister = this._fetchActiveRegister
        this.filterActive = false
        this.mainListMeta = {
            mainJson: this.domElement.dataset.movies,
            length: JSON.parse( this.domElement.dataset.movies ).length, // RETURNS AN INTEGER
            filterables: Register.extractUniqueValues( JSON.parse( this.domElement.dataset.movies ) ), // RETURNS AN OBJECT WITH PROPS IDENTICAl TO A MOVIE INSTANCE WITHOUT 'title' OR 'filmID'
        }
    }

    _populateRegister( definedMovieList = null ){
        const movieData = definedMovieList || ( this.listContent || JSON.parse( this.mainListMeta.movieJson ) )
        Register.checkIfEmpty( movieData ) ? this._NonFoundProtocol() : this._preInsertProtocol( movieData );
        this._insertMovies( movieData )
    }

    _insertMovies( movieData ){
        const activeRegister = this.activeRegister()
        for (const item of movieData){
            const newMovie = new Movie( item.filmID, item.title, item.yearReleased, item.rating, item.duration, item.genre )
            activeRegister.insertAdjacentElement( 'beforeend',  activeRegister.classList.contains('movie-register') ? newMovie._constructCardItemHTML() : newMovie._constructListItemHTML() );
        }
    }

    _runFilter( formElements, movieList = undefined ){
        const movies = movieList || this.listContent
        const filter = new Filter( formElements )
        console.log( filter )
        console.log( filter.isEmpty() )
        const filteredMovies = filter.isEmpty() ? movies.filter( ( movie ) => { return filter._satisfiesFilter( movie ) } ) : movies ;
        this.filterActive = true
        this._populateRegister( filteredMovies )
    }

    _preInsertProtocol( movieData ){
        this.listContent = this.filterActive ? this.listContent : movieData;
        this._clearRegister()
        this.errMsg.style.display = 'none';
    }

    _NonFoundProtocol(){
        this._clearRegister()
        this.errMsg.style.display = 'block';
    }

    static checkIfEmpty( movieList ){
        return movieList.length == 0 || movieList == undefined
    }

    _switchFormat( formatToggler ){
        if( formatToggler.classList.contains('list-toggle') ) this._setFormatToList();
        else if( formatToggler.classList.contains('card-toggle')) this._setFormatToCard();
        setFormatIcon( this )
    }

    _formatForScreenWidth( screenWidth1090 ){
        if( screenWidth1090.matches ){
            this._setLockedFormat( this._setFormatToCard.bind(this) );
            this._populateRegister()
        }
        else this._unlockFormat();
    }
    
    _fetchActiveRegister(){
        const formatSetToList = this.domElement.classList.contains('tabular-register')
        const formatSetToCard = this.domElement.classList.contains('non-tabular-register')
        const activeRegister = formatSetToList ? this.domElement.querySelector('tbody') : formatSetToCard ? this.domElement.querySelector('.movie-register') : null;
        return activeRegister
    }

    _fetchRegisterMeta( list = undefined ){
        const movies = list !== undefined ? list : JSON.parse( this.domElement.dataset.movies );
        const metaData = {
            
        }
        return metaData
    }

    _setLockedFormat( formatSetter ){
        const formatToggler = getTaskbarDomElement().querySelector('.register-format-toggle')
        if( !formatToggler ) return;
        formatToggler.style.display = 'none'
        formatSetter()
    }

    _unlockFormat(){
        const formatToggler = getTaskbarDomElement().querySelector('.register-format-toggle')
        if( !formatToggler ) return;
        formatToggler.style.display = 'flex'
        setFormatIcon( this )
    }

    _setFormatToCard(){
        if( this.domElement.classList.contains('non-tabular-register') ) return;
        this.domElement.classList.remove('tabular-register')
        this.domElement.classList.add('non-tabular-register')
    }

    _setFormatToList(){
        if( this.domElement.classList.contains('tabular-register') ) return;
        this.domElement.classList.remove( 'non-tabular-register' )
        this.domElement.classList.add( 'tabular-register' )
    }

    _clearRegister(){
        this.domElement.querySelectorAll('.register').forEach( register => {
            if( register.children || Array.from( register.children ).length != 0 ) Array.from( register.children ).forEach( elem => elem.remove() );
        })
    }
    
    static extractUniqueValues( movieList ){
        const uniqueValues = new Filterables()
        movieList.forEach( movie => {
            for( const key of Object.keys( uniqueValues )){
                if( !uniqueValues[key].includes( movie[key] ) ) uniqueValues[key].push( movie[key] );
            }
        })
        return uniqueValues
    }
}