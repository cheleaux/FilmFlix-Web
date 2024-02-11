import Taskbar from './taskbar.js'
import Movie from './movie.js'


export default class Register {
    constructor( domElement ){
        this.domElement = domElement
        this.listContent = []
        this.errMsg = domElement.querySelector('.err-not-found') || null
        this.activeRegister = this._fetchActiveRegister
    }

    _populateRegister( definedMovieList = null ){
        const movieData = definedMovieList || ( this.listContent || JSON.parse( this.domElement.dataset.movies ) )
        const activeRegister = this.activeRegister()
        this.listContent = movieData

        if( movieData.length == 0 || movieData == undefined ){
            this.errMsg.style.display = 'block';
            return
        } else this.errMsg.style.display = 'none';

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
        const formatToggler = Taskbar.domElement.querySelector('.register-format-toggle')
        if( !formatToggler ) return;
        formatToggler.style.display = 'none'
        formatSetter()
    }

    _unlockFormat(){
        const formatToggler = Taskbar.domElement.querySelector('.register-format-toggle')
        if( !formatToggler ) return;
        formatToggler.style.display = 'flex'
        Taskbar.setFormatIcon( this )
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

}