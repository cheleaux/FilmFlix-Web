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
    form.classList.add('after-add')
    submitBtn.innerHTML = 'Added Successfully <span><i class="bi bi-check"></i></span>'
    const newMovie = JSON.stringify( makeMovie() )
    submitForm( newMovie )
}

function submitForm( movie ){
    const xhttp = new XMLHttpRequest()
    xhttp.open( 'UPDATE', `/api/movies/edit/${ movie.id }`, true )
    xhttp.setRequestHeader( 'Content-type', 'application/json; charset=UTF-8' )
    xhttp.send( movie )
}

const exports = { form, submitBtn, displayMovieDetails, lockAndSubmitForm }
export default exports;
