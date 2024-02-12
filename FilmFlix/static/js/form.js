import Movie from './movie.js'


export default class Form{
    constructor( domElement, operation ){
        this.domElement = domElement
        this.operation = String( operation )
        this.titleInp = this.domElement.querySelector('#title-input')
        this.releaseInp = this.domElement.querySelector('#release-input')
        this.ratingInp = this.domElement.querySelector('#rating-input')
        this.durationInp = this.domElement.querySelector('#duration-input')
        this.genreInp = this.domElement.querySelector('#genre-input')
        this.submit = document.querySelector('.submitBtn')
    }

    _displayMovieDetails( movieDetails ){
        this.titleInp.value = movieDetails.title
        this.releaseInp.value = movieDetails.yearReleased
        this.ratingInp.value = movieDetails.rating
        this.durationInp.value = movieDetails.duration
        this.genreInp.value = movieDetails.genre
    }

    _submit( ID, successStatement ){
        const movie = new Movie( ID, this.titleInp.value, this.releaseInp.value, this.ratingInp.value, this.durationInp.value, this.genreInp.value )
        this.submit.innerHTML = `${ successStatement } <span><i class="bi bi-check"></i></span>`
        this.operation === 'update' ? movie._updateMovieDetails() :
        this.operation === 'insert' ? movie._addNew() : alert( `invalid form operation '${ this.operation }'` )
    }

    _lockForm(){
        this.domElement.classList.add('after-add')
    }
}