import Movie from './Movie.js'


const movieTbl = document.querySelector('.movie-table')
const tblBody = document.querySelector('tbody')
const errMsg = document.querySelector('.err-not-found')
const confirmDelMenu = document.querySelector('#confirm-del-container')

let movieList = []
let confirmation;

function populateTable( customListMovies = null ){
    const movieData = customListMovies || JSON.parse(tblBody.dataset.movies);
    if( movieData.length == 0 || movieData == undefined ) errMsg.style.display = 'block';
    clearTable()
    for (const item of movieData){
        const newMovie = new Movie( item.filmID, item.title, item.yearReleased, item.rating, item.duration, item.genre )
        tblBody.insertAdjacentElement( 'afterbegin', newMovie._constructListItemHTML() )
        movieList.push( newMovie )
    }
    
}

function clearTable(){
    Array.from(tblBody.children).forEach( elem => elem.remove())
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
    const movie = movieList.find( (movie) => movieRow.id == movie.id )
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



const exports = { movieTbl, populateTable, enableMovieActionsMenu }
export default exports;