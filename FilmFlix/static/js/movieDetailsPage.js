import Form from './form.js'


function initialiseForm( domElement, operation ){
    const form = new Form( domElement, operation )
    return form
}

function displayMovieDetails( form ){
    const movieDetails = form.domElement.dataset.movie
    form._displayMovieDetails( movieDetails )
}

function lockAndSubmitForm( form, e ) {
    if (e.target != submitBtn) return;
    const ID = JSON.parse( form.domElement.dataset.movie ).id
    const successStatement = form.operation === 'update' ? 'Successfully Updated' : 'Successfully Added' ;
    form._lockForm()
    form._submit( ID, successStatement )
}

export default { displayMovieDetails, lockAndSubmitForm, initialiseForm };
