import Taskbar from './taskbar.js'
import Movie from './movie.js'


export default class Register {
    constructor( domElement ){
        this.domElement = domElement
        this.listContent = []
        this.errMsg = domElement.querySelector('.err-not-found')
        this.activeRegister = this._fetchActiveRegister
    }

    _populateRegister( definedMovieList = null ){
        const movieData = definedMovieList || this.listContent
        const activeRegister = this.activeRegister()
        this.listContent = movieData
        if( movieData.length == 0 || movieData == undefined ) errMsg.style.display = 'block';
        this._clearRegister()
        for (const item of movieData){
            const newMovie = new Movie( item.filmID, item.title, item.yearReleased, item.rating, item.duration, item.genre )
            activeRegister.insertAdjacentElement( 'beforeend',  activeRegister.classList.contains('movie-register') ? newMovie._constructCardItemHTML() : newMovie._constructListItemHTML() );
        }
    }

    _switchFormat( formatToggler ){
        if( formatToggler.classList.contains('list-toggle') ) this._setFormatToList();
        else if( formatToggler.classList.contains('card-toggle')) this._setFormatToCard();
        Taskbar.setFormatIcon( this )
    }

    _formatForScreenWidth(){
        const screenWidth1180 = window.matchMedia('(max-width: 1180px)')
        if( screenWidth1180.matches ) this.setFormatToCard();
        else this.setFormatToList();
    }

    _setFormatToCard(){
        this.domElement.classList.remove( 'tabular-register' )
        this.domElement.classList.add( 'non-tabular-register' )
    }

    _setFormatToList(){
        this.domElement.classList.remove( 'non-tabular-register' )
        this.domElement.classList.add( 'tabular-register' )
    }

    _fetchActiveRegister(){
        const formatSetToList = this.domElement.classList.contains('tabular-register')
        const formatSetToCard = this.domElement.classList.contains('non-tabular-register')
        const activeRegister = formatSetToList ? this.domElement.querySelector('tbody') : formatSetToCard ? this.domElement.querySelector('.movie-register') : null;
        return activeRegister
    }

    _clearRegister(){
        const activeRegister = this.activeRegister()
        if(activeRegister.children || Array.from(activeRegister.children).length != 0 ) Array.from(activeRegister.children).forEach( elem => elem.remove() );
    }

}