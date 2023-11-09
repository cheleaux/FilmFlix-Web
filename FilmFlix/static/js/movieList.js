import Movie from './Movie.js'


const movieTbl = document.querySelector('.movie-table')
const tblHead = document.querySelector('thead')
const tblBody = document.querySelector('tbody')
const dataPackage = document.querySelector("#movie-list-package")

const movies = JSON.parse(dataPackage.dataset.movies)

console.log( movies[0] )

for (const item of movies){
    const newMovie = new Movie( item.id, item.title, item.yearReleased, item.rating, item.duration, item.genre )
    tblBody.insertAdjacentElement( 'afterbegin', newMovie._constructListItemHTML() )
}