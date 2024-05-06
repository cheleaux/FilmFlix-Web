import Movie from './movie.js'
import Filter from './filter.js'
import FilterComponent from './filterComponent.js'
import { getTaskbarDomElement, setFormatIcon } from './taskbar.js'
import { sortArguments, extractUniqueValues } from './Utils.js'

export default class Register {
    constructor( domElement, ObserverHub ){
        this.domElement = domElement
        this.ObserverHub = ObserverHub
        this.listContent = []
        this.errMsg = domElement.querySelector('.err-not-found') || null
        this.activeRegister = this._fetchActiveRegister
        this.filterActive = false
        this.mainListMeta = {
            mainJson: this.domElement.dataset.movies,
            length: JSON.parse( this.domElement.dataset.movies ).length, // RETURNS AN INTEGER
            filterables: extractUniqueValues( JSON.parse( this.domElement.dataset.movies ) ), // RETURNS AN OBJECT WITH PROPS IDENTICAl TO A MOVIE INSTANCE WITHOUT 'title' OR 'filmID'
        }
    }

    _populateRegister(){
        const { definedMovieList, filterActive, rootFetch } = sortArguments( arguments, '_populateRegister' )
        // console.log(`root fetch status: ${ rootFetch }`)
        const movieData = definedMovieList || ( rootFetch ? JSON.parse( this.mainListMeta.mainJson ) : this.listContent )
        // console.log(`movieData:`, movieData, JSON.parse( this.mainListMeta.mainJson ) )
        Register.isEmpty( movieData ) ? this._NonFoundProtocol() : this._preInsertProtocol( movieData );
        filterActive ? this._insertMovies( this._runFilter( movieData ) ) : this._insertMovies( movieData ) ;
    }

    _insertMovies( movieData ){
        const activeRegister = this.activeRegister()
        for(const item of movieData){
            const newMovie = new Movie( item.filmID, item.title, item.yearReleased, item.rating, item.duration, item.genre )
            activeRegister.insertAdjacentElement( 'beforeend',  activeRegister.classList.contains('movie-register') ? newMovie._constructCardItemHTML() : newMovie._constructListItemHTML() );
        }
    }

    _removeMovie( movieID ){
        try {
            var movieEl = Array.from( this.activeRegister().children).find( movieRow => movieRow.id == movieID )
            movieEl.remove()
        } catch( err ){
            if( !movieEl ) console.error(`Register Error: Could not find movie element of id ${ movieID }:\n${ err }`);
        }
    }

    _runFilter( movieList = undefined ){
        const movies = movieList || this.listContent
        const filter = new Filter( FilterComponent.getUserFilterSelections() )
        const filteredMovies = !filter.isEmpty() ? movies.filter( ( movie ) => { return filter._satisfiesFilter( movie ) } ) : movies ;
        this.filterActive = !filter.isEmpty() ? true : false;
        return filteredMovies
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

    _setLockedFormat( formatSetter ){
        const formatToggler = getTaskbarDomElement().querySelector('.register-format-toggle')
        if( !formatToggler ) r
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
    
    _refreshElement( elements, component = undefined ){
        elements.forEach( ( element ) => {
            switch( element ){
                case 'rootFetch':
                    Movie.fetchAllMoviesJson()
                    .then( movies => this.domElement.dataset.movies = JSON.stringify( movies ) )
                case 'filterables':
                    const data = { 
                        filterables: this.mainListMeta.filterables,
                        domComponents: { 
                            Register: this,
                            Sidebar: component
                        }
                    }
                    this.mainListMeta.filterables = extractUniqueValues( JSON.parse( this.domElement.dataset.movies ) )
                    this.ObserverHub._notify( data, 'filterablesChanged' )
                }
        })
    }

    static isEmpty( movieList ){
        return movieList.length == 0 || movieList == undefined
    }


}