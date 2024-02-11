

export default function enableMovieActionsMenu( e, register ){
    e.stopPropagation()
    if( e.target.classList.contains('bi-three-dots') ) toggleMenuVisibility( e.target, register );
    else if ( e.target.closest('.delete-btn') ){
        closeAllActionMenus( register )
        getDeleteComfirmation( e.target, register )
    };
}

function toggleMenuVisibility( optBtn = undefined, register = undefined ){
    const optMenu = ( optBtn.closest('.tbl-row-opt') || optBtn.closest('.mv-item-opt') ).querySelector('.row-opt-menu') 
    const disableMovieActionsMenu = ( e ) => {
        if( !(e.target in optMenu.children) ){
            toggleMenuVisibility( optMenu, register )
            disableMenuManualFocus( { disableMenuFunc: disableMovieActionsMenu, register } )
        }
    }
    if ( optMenu.style.display != 'revert' ) openMenuAndManualFocus( optMenu, disableMovieActionsMenu, register );
    else optMenu.style.display = 'none'
}

function openMenuAndManualFocus( optMenu, disableMovieActionsMenu, register ){
    closeAllActionMenus( register )
    optMenu.style.display = 'revert';
    enableMenuManualFocus( { disableMenuFunc: disableMovieActionsMenu, register } )
}

function enableMenuManualFocus( { disableMenuFunc, register } ){
    document.querySelector('body').addEventListener( 'click', disableMenuFunc )
    register.domElement.addEventListener( 'click', disableMenuFunc )
}

function disableMenuManualFocus( { disableMenuFunc, register } ){
    document.querySelector('body').removeEventListener( 'click', disableMenuFunc )
    register.domElement.removeEventListener( 'click', disableMenuFunc )
}

function closeAllActionMenus( register ){
    register.activeRegister().querySelectorAll('.row-opt-menu').forEach( menu => menu.style.visibility = 'none' )
}


function getDeleteComfirmation( Btn, register ){
    const movieRow = Btn.closest('.mv-row') || Btn.closest('.mv-list-item')
    const movie = register.listContent.find( (movie) => movieRow.id == movie.filmID )
    const confirmDelMenu = document.querySelector('#confirm-del-container')
    toggleConfirmWindow( confirmDelMenu, movie.title )
    confirmDelMenu.querySelector('.confirm-del-btns').addEventListener( 'click', ( e ) => {
        ConfirmAndRemove( e, movie, movieRow )
    }, { once: true })
}

function toggleConfirmWindow( confirmDelMenu, title = undefined ){
    if ( confirmDelMenu.style.display != 'flex'){
        confirmDelMenu.style.display = 'flex'
        document.querySelector('body').classList.add('blurred')
        confirmDelMenu.querySelector('span').innerHTML = title
    } else {
        confirmDelMenu.style.display = 'none';
        document.querySelector('body').classList.remove('blurred')
    }
}

function ConfirmAndRemove( e, movie, HTMLRow ){
    if ( e.target.closest('button').id == 'confirm-del' ){
        toggleConfirmWindow()
        HTMLRow.style.display = 'none'
        movie._deleteMovie()
    }
    else if ( e.target.closest('button').id == 'cancel-del' ) toggleConfirmWindow();
}
