import CustomList from './customList.js'
import Movie from './movie.js'
import Sidebar from './sidebar.js';
import Register from './register.js'
import customListMenu from './customListMenu.js';

export default function enableMovieActionsMenu( e, register ){
    e.stopPropagation()
    if( e.target.classList.contains('bi-three-dots') ) toggleMenuVisibility( e.target, register );
    else if ( e.target.closest('.delete-btn') ){
        const movie = Movie.fetchParentMovie( e.target, register )
        closeAllActionMenus( register )
        confirmDelete( movie, register )
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

export function confirmDelete( item, parentElement = null ){
    const confirmDelMenu = document.querySelector('#confirm-del-container')

    // IF ITEM IS INSTANCE OF MOVIE PROCESS AS A MOVIE
    if( item.hasOwnProperty('filmID') ){
        var confimDisplayName = item.title
        confirmDelMenu.querySelector('.confirm-del-btns').addEventListener( 'click', ( e ) => deleteOnConfirm( e, item, Movie.delete, confirmDelMenu, parentElement ),
        { once: true } )
    } 
    // IF ITEM IS INSTANCE OF CUSTOM LIST PROCESS AS A CUSTOM LIST
    else if( item instanceof CustomList ){
        var confimDisplayName = item.name
        confirmDelMenu.querySelector('.confirm-del-btns').addEventListener( 'click', ( e ) => deleteOnConfirm( e, item, CustomList.delete, confirmDelMenu ),
        { once: true } )
    }

    // MAKE THE CONFIRM WINDOW VISIBLE
    toggleConfirmWindow( confirmDelMenu, confimDisplayName )
}

async function deleteOnConfirm( e, item, deleteFunction, confirmDelMenu, parentComponent = null ){
    if ( e.target.closest('button').id == 'confirm-del' ){
        
        try {
            toggleConfirmWindow( confirmDelMenu )
            var res = await deleteFunction( item )
            if( res.ok ) refreshElementContaier( item, parentComponent );

        } catch( err ){
            console.error(`Couldn't not delete: ${ err }`)
        }
    }
    else if ( e.target.closest('button').id == 'cancel-del' ) toggleConfirmWindow( confirmDelMenu );
}

function refreshElementContaier( item, parentComponent ){
    if( item.hasOwnProperty('filmID') ){
        // IF ITEM IS A MOVIE GRAB THE MOVIE ELEMENT AND THE ACTIVE LIST IDs
        const Register = parentComponent
        const movieEl = Array.from( Register.activeRegister().children).find( movieRow => movieRow.id == item.filmID )
        const activeListID = customListMenu.fetchActiveList().dataset.list

        // REMOVE THE MOVIE ELEMENT FROM THE LIST
        movieEl.remove()

        // REFETCH THE ENTIRE REGISTRY MOVI JSON STORE IN MEMORY AND RERENDER THE ACTIVE LIST
        Register.refreshElement('rootFetch')
        customListMenu.renderListByID( activeListID, Register )

    } else if( item instanceof CustomList ){
        // IF ITEM IS A COLLECTION RERENDER THE COLLECTIONS MENU
        Sidebar.refreshElement('listMenu')
    }
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