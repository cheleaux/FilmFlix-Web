import Movie from './Movie.js'

const form = document.querySelector('#insertForm')
const submitBtn = document.querySelector('.submitBtn')

function lockAndSubmitForm( e ) {
    if (e.target != submitBtn) return;
    form.classList.add('after-add')
    submitBtn.innerHTML = 'Added Successfully <span><i class="bi bi-check"></i></span>'
    const newMovie = JSON.stringify( makeMovie() )
    submitForm( newMovie ) 
}

function submitForm( movie ){
    const xhttp = new XMLHttpRequest()
    xhttp.open( 'POST', '/api/add-movie', true )
    xhttp.setRequestHeader( 'Content-type', 'application/json; charset=UTF-8' )
    xhttp.send( movie )
}

function makeMovie(){
    const newMovie = new Movie( 
        document.querySelector('#title-input').value,
        document.querySelector('#release-input').value,
        document.querySelector('#rating-input').value,
        document.querySelector('#duration-input').value,
        document.querySelector('#genre-input').value
    )
    return newMovie
}


const exports = { form, lockAndSubmitForm }
export default exports;