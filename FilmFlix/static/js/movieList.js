import Movie from './Movie.js'


const movieTbl = document.querySelector('.movie-table')
const tblHead = document.querySelector('thead')
const tblBody = document.querySelector('tbody')
const errMsg = document.querySelector('.err-not-found')
const confirmDelMenu = document.querySelector('#confirm-del-container')

let movieList = []
let confirmation;

function populateTable(){
    const movieData = JSON.parse(tblBody.dataset.movies)
    for (const item of movieData){
        const newMovie = new Movie( item.id, item.title, item.yearReleased, item.rating, item.duration, item.genre )
        tblBody.insertAdjacentElement( 'afterbegin', newMovie._constructListItemHTML() )
        movieList.push( newMovie )
    }
    if(tblBody.children.length == 0) errMsg.style.display = 'block'
}

function handleMenuSelection( e ){
    if( e.target.classList.contains('bi-three-dots') ) toggleOptionsMenu( e.target );
    else if ( e.target.closest('.delete-btn') ){
        movieTbl.querySelectorAll('.row-opt-menu').forEach( menu => menu.style.display = 'none')
        getComfirmation( e.target )
    };
}

function toggleOptionsMenu( optBtn = undefined ){
    const optMenu = optBtn.closest('.tbl-row-opt').querySelector('.row-opt-menu')
    if ( optMenu.style.display != 'revert' ) {
        movieTbl.querySelectorAll('.row-opt-menu').forEach( menu => menu.style.display = 'none')
        optMenu.style.display = 'revert';
    }
    else optMenu.style.display = 'none'
}

function getComfirmation( Btn ){
    console.log('in getComfirmation')
    const movieRow = Btn.closest('.mv-row')
    const movie = movieList.find( (movie) => movieRow.id == movie.id )
    toggleConfirmWindow( movie.title )
    confirmDelMenu.querySelector('.confirm-del-btns').addEventListener( 'click', ( e ) => {
        ConfirmAndRemove( e, movie, movieRow )
    }, { once: true })
}

function toggleConfirmWindow( title = undefined ){
    console.log('in toggleConfirmWindow')
    console.log( confirmDelMenu.style.display )
    if ( confirmDelMenu.style.display != 'flex'){
        confirmDelMenu.style.display = 'flex'
        confirmDelMenu.querySelector('span').innerHTML = title
    }
    else {
        confirmDelMenu.style.display = 'none'
    }
}

function ConfirmAndRemove( e, movie, HTMLRow ){
    console.log('in ConfirmAndRemove')
    if (e.target.closest('button').id == 'confirm-del'){
        toggleConfirmWindow()
        HTMLRow.style.display = 'none'
        movie._deleteMovie()
    }
    else if (e.target.closest('button').id == 'cancel-del'){
        toggleConfirmWindow()
    }
    
}

const exports = { movieTbl, populateTable, handleMenuSelection }
export default exports;