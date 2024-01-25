import Movie from './Movie.js'


const movieListContainer = document.querySelector('.movie-register-container')
const confirmDelMenu = document.querySelector('#confirm-del-container')
const movieTbl = movieListContainer.querySelector('.movie-table')
const movieTBLBody = movieListContainer.querySelector('tbody')
const movieRegisterUl = movieListContainer.querySelector('.movie-register')
const errMsg = movieListContainer.querySelector('.err-not-found')

let movieList = []

// MESSY 'populateTable' FUNCTION NEEDS TO BE REFACTORED
// DEFINE MOVIE HTML TEMPLATE FOR CARD REGISTER FORMAT
function populateTable( definedMovieList = null ){
    const movieData = definedMovieList || JSON.parse(movieListContainer.dataset.movies);
    const isTabularList = movieListContainer.classList.contains('tabular-register')
    movieList = movieData
    if( movieData.length == 0 || movieData == undefined ) errMsg.style.display = 'block';
    clearRegister()
    for (const item of movieData){
        const newMovie = new Movie( item.filmID, item.title, item.yearReleased, item.rating, item.duration, item.genre )
        isTabularList ? movieTBLBody.insertAdjacentElement( 'beforeend', newMovie._constructTableRowHTML() ) : movieRegisterUl.insertAdjacentElement( 'beforeend', newMovie._constructListItemHTML() );
    }
}

// DEFINE CSS TO SWITCH DISPLAY OF REGISTER LIST AND TABLE
function setMovieListFormat( format ){
    switch(format) {
        case 'tabular': setRegisterFormatToTabular();
        case 'block': setRegisterFormatToBlock();
    }
    populateTable( movieList )
}

function enableMovieActionsMenu( e ){
    e.stopPropagation()
    if( e.target.classList.contains('bi-three-dots') ) toggleMenuVisibility( e.target );
    else if ( e.target.closest('.delete-btn') ){
        movieTbl.querySelectorAll('.row-opt-menu').forEach( menu => menu.style.display = 'none')
        getDeleteComfirmation( e.target )
    };
}

function toggleMenuVisibility( optBtn = undefined ){
    const optMenu = optBtn.closest('.tbl-row-opt').querySelector('.row-opt-menu')

    const disableMovieActionsMenu = ( e ) => {
        if( !(e.target in optMenu.children) ){
            toggleMenuVisibility( optMenu )
            document.querySelector('body').removeEventListener( 'click', disableMovieActionsMenu )
        }
    }

    if ( optMenu.style.display != 'revert' ) openMenuAndManualFocus( optMenu, disableMovieActionsMenu );
    else optMenu.style.display = 'none'
}

function openMenuAndManualFocus( optMenu, disableMovieActionsMenu ){
    movieTbl.querySelectorAll('.row-opt-menu').forEach( menu => menu.style.display = 'none')
    optMenu.style.display = 'revert';
    document.querySelector('body').addEventListener( 'click', disableMovieActionsMenu )
}

function getDeleteComfirmation( Btn ){
    const movieRow = Btn.closest('.mv-row')
    const movie = movieList.find( (movie) => movieRow.id == movie.filmID )
    toggleConfirmWindow( movie.title )
    confirmDelMenu.querySelector('.confirm-del-btns').addEventListener( 'click', ( e ) => {
        ConfirmAndRemove( e, movie, movieRow )
    }, { once: true })
}

function toggleConfirmWindow( title = undefined ){
    if ( confirmDelMenu.style.display != 'flex'){
        confirmDelMenu.style.display = 'flex'
        confirmDelMenu.querySelector('span').innerHTML = title
    }
    else {
        confirmDelMenu.style.display = 'none'
    }
}

function ConfirmAndRemove( e, movie, HTMLRow ){
    if (e.target.closest('button').id == 'confirm-del'){
        toggleConfirmWindow()
        HTMLRow.style.display = 'none'
        movie._deleteMovie()
    }
    else if (e.target.closest('button').id == 'cancel-del'){
        toggleConfirmWindow()
    }
    
}

function setRegisterFormatToTabular(){
    movieListContainer.classList.remove('non-tabular-register')
    movieListContainer.classList.add('tabular-register')
}

function setRegisterFormatToBlock(){
    movieListContainer.classList.remove('tabular-register')
    movieListContainer.classList.add('non-tabular-register')
}

function clearRegister(){
    const isRegisterFormatTabular = movieListContainer.classList.contains('tabular-register')
    const isRegisterFormatBlock = movieListContainer.classList.contains('non-tabular-register')
    const activeRegisterChildren = isRegisterFormatTabular ? movieTBLBody.children : isRegisterFormatBlock ? movieRegisterUl.children : null;
    Array.from(activeRegisterChildren).forEach( elem => elem.remove() )
}

const exports = { movieTbl, populateTable, enableMovieActionsMenu, setMovieListFormat }
export default exports;