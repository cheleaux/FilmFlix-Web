import Movie from './Movie.js'


const titleInp = document.querySelector('#title-input')
const releaseInp = document.querySelector('#release-input')
const ratingInp = document.querySelector('#rating-input')
const durationInp = document.querySelector('#duration-input')
const genreInp = document.querySelector('#genre-input')
const form = document.querySelector('#insertForm')
const submitBtn = document.querySelector('.submitBtn')


function displayMovieDetails(){
    const details = JSON.parse( form.dataset.movie )
    titleInp.value = details.title
    releaseInp.value = details.yearReleased
    ratingInp.value = details.rating
    durationInp.value = details.duration
    genreInp.value = details.genre
}

function lockAndSubmitForm( e ) {
    if (e.target != submitBtn) return;
    const ID = JSON.parse( form.dataset.movie ).id
    const updatedMovie = new Movie( ID, titleInp.value, releaseInp.value, ratingInp.value, durationInp.value, genreInp.value )
    form.classList.add('after-add')
    submitBtn.innerHTML = 'Added Successfully <span><i class="bi bi-check"></i></span>'
    updatedMovie._updateMovieDetails()
}

const exports = { form, submitBtn, displayMovieDetails, lockAndSubmitForm }
export default exports;
