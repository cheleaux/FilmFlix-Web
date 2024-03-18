import Form from './form.js'


function initialiseForm( domElement, operation ){
    const form = new Form( domElement, operation )
    return form
}

function displayMovieDetails( form ){
    if( form.operation == 'update' ){
        const movieDetails = JSON.parse( form.domElement.dataset.movie )
        form._displayMovieDetails( movieDetails )
    }
}

function lockAndSubmitForm( form, e ) {
    if ( e.target != form.submit ) return;

    switch( form.operation ){
        case 'update':
            var ID = JSON.parse( form.domElement.dataset.movie ).filmID || undefined
            var successStatement = 'Successfully Updated'
        case 'insert':
            var successStatement = 'Successfully Added'
    }
    
    form._lockForm()
    form._submit( ID, successStatement )
}

export default { displayMovieDetails, lockAndSubmitForm, initialiseForm };
