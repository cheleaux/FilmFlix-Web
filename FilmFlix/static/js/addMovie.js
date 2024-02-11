import Movie from './movie.js'

const form = document.querySelector('#insertForm') || null
const submitBtn = document.querySelector('.submitBtn') || null

function lockAndSubmitForm( e ) {
    if (e.target != submitBtn) return;
    const newMovie = makeMovie()
    form.classList.add('after-add')
    submitBtn.innerHTML = 'Added Successfully <span><i class="bi bi-check"></i></span>'
    newMovie._addNew()
}

function makeMovie(){
    const newMovie = new Movie(
        undefined,
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