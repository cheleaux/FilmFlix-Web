import Movie from './Movie.js'


const movieListContainer = document.querySelector('.movie-register-container')
const confirmDelMenu = document.querySelector('#confirm-del-container')
const movieTbl = movieListContainer.querySelector('.movie-table')
const movieTBLBody = movieListContainer.querySelector('tbody')
const movieRegisterUl = movieListContainer.querySelector('.movie-register')
const errMsg = movieListContainer.querySelector('.err-not-found')
const taskbar = document.querySelector('.register-taskbar')

let movieList = []

// MESSY 'populateRegister' FUNCTION NEEDS TO BE REFACTORED
// DEFINE MOVIE HTML TEMPLATE FOR CARD REGISTER FORMAT
function populateRegister( definedMovieList = null ){
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
    populateRegister( movieList )
}

function enableMovieActionsMenu( e ){
    e.stopPropagation()
    if( e.target.classList.contains('bi-three-dots') ) toggleMenuVisibility( e.target );
    else if ( e.target.closest('.delete-btn') ){
        movieTbl.querySelectorAll('.row-opt-menu').forEach( menu => menu.style.display = 'none')
        getDeleteComfirmation( e.target )
    };
}

function handleUserTask( e ){
    const taskComponent = e.target.closest('.taskbar-opt')
    if( taskComponent.classList.contains('register-format-toggle') ) changeRegisterFormat( e );
    else if( taskComponent.classList.contains('register-filter') ) console.log('filter clicked');
}

function toggleMenuVisibility( optBtn = undefined ){
    const optMenu = ( optBtn.closest('.tbl-row-opt') || optBtn.closest('.mv-item-opt') ).querySelector('.row-opt-menu') 

    const disableMovieActionsMenu = ( e ) => {
        console.log('click logged')
        if( !(e.target in optMenu.children) ){
            toggleMenuVisibility( optMenu )
            disableMenuManualFocus( { disableMovieFunc: disableMovieActionsMenu } )
        }
    }

    if ( optMenu.style.display != 'revert' ) openMenuAndManualFocus( optMenu, disableMovieActionsMenu );
    else optMenu.style.display = 'none'
}

function openMenuAndManualFocus( optMenu, disableMovieActionsMenu ){
    movieListContainer.querySelectorAll('.row-opt-menu').forEach( menu => menu.style.display = 'none')
    optMenu.style.display = 'revert';
    enableMenuManualFocus( { disableMovieFunc: disableMovieActionsMenu} )
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
    else confirmDelMenu.style.display = 'none';
}

function ConfirmAndRemove( e, movie, HTMLRow ){
    if (e.target.closest('button').id == 'confirm-del'){
        toggleConfirmWindow()
        HTMLRow.style.display = 'none'
        movie._deleteMovie()
    }
    else if (e.target.closest('button').id == 'cancel-del') toggleConfirmWindow();
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

// implement enable format functions somehow
function changeRegisterFormat( e ){
    const formatToggler = e.target.closest('.format-toggler')
    if( iconMatchesFormat( formatToggler ) ) return;
    if( formatToggler.classList.contains('list-toggle') ) setRegisterFormat( formatToggler );
    else if( formatToggler.classList.contains('card-toggle')) setRegisterFormat( formatToggler );
    populateRegister( movieList )
}

function setRegisterFormat( userSelection ){
    const isFormatTypeList = userSelection.classList.contains('list-toggle')
    movieListContainer.classList.remove( isFormatTypeList ? 'non-tabular-register' : 'tabular-register' )
    movieListContainer.classList.add( isFormatTypeList ? 'tabular-register' : 'non-tabular-register' )
    selectFormatIcon()
}

function iconMatchesFormat( formatSelection ){
    const iconAndRegisterAsList = movieListContainer.classList.contains('non-tabular-register') && formatSelection.classList.contains('card-toggle')
    const iconAndRegisterAsCard = movieListContainer.classList.contains('tabular-register') && formatSelection.classList.contains('list-toggle')
    const iconMatchesRegisterformat = ( iconAndRegisterAsCard || iconAndRegisterAsList )
    return iconMatchesRegisterformat
}

function selectFormatIcon(){
    const formatTogglerComponent = taskbar.querySelector('.register-format-toggle')
    const formatToggleTypeCard = formatTogglerComponent.querySelector('.card-toggle')
    const formatToggleTypelist = formatTogglerComponent.querySelector('.list-toggle')
    Array.from( formatTogglerComponent.children ).forEach( toggler => { toggler.classList.remove('active') })
    movieListContainer.classList.contains('non-tabular-register') ? formatToggleTypeCard.classList.add('active') :
    movieListContainer.classList.contains('tabular-register') ? formatToggleTypelist.classList.add('active') : console.log('Element "movieListContainer" format class not matched')
}

function enableMenuManualFocus( { disableMovieFunc } ){
    document.querySelector('body').addEventListener( 'click', disableMovieFunc )
    movieListContainer.addEventListener( 'click', disableMovieFunc )
}

function disableMenuManualFocus( { disableMovieFunc } ){
    document.querySelector('body').removeEventListener( 'click', disableMovieFunc )
    movieListContainer.removeEventListener( 'click', disableMovieFunc )
}

const exports = { movieListContainer, taskbar, populateRegister, selectFormatIcon, enableMovieActionsMenu, setMovieListFormat, handleUserTask }
export default exports;