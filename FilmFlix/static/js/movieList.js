import Movie from './Movie.js'


const movieTbl = document.querySelector('.movie-table')
const tblHead = document.querySelector('thead')
const tblBody = document.querySelector('tbody')
const errMsg = document.querySelector('.err-not-found')


if (movieTbl) {
    const movies = JSON.parse(tblBody.dataset.movies)

    for (const item of movies){
        const newMovie = new Movie( item.id, item.title, item.yearReleased, item.rating, item.duration, item.genre )
        tblBody.insertAdjacentElement( 'afterbegin', newMovie._constructListItemHTML() )
    }

    if(tblBody.children.length == 0) errMsg.style.display = 'block'
}
