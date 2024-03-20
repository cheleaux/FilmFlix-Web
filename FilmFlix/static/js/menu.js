import CustomList from './customList.js'
import Movie from './movie.js'
import customListMenu from './customListMenu.js';


// TODO: MAKE THE MENU INTERFACE AWARE OF REGISER AND SIDEBAR COMPONENTS
// TODO: REDUCE THE AMOUNT OF PARAMETERS
// TODO: REFACTOR RECURRING VARIABLES AS STATE VARIABLES
// TODO: MAKE THE 'refreshElementContaier' FUNCTION OBSELETE WITH AN OBSERVER
// TODO: ENSURE ALL MENU INTERFACING IS UPDATE TO INTERFACE USING THE NEW CLASS
export default class MenuInterface {
    constructor( ObserverHub, Register, Sidebar ){
        this.ObserverHub = ObserverHub
        this.confirmDelMenu = document.querySelector('#confirm-del-container')
        this.Register = Register
        this.Sidebar = Sidebar
    }

    _enableMovieActionsMenu( e ){
        e.stopPropagation()
        if( e.target.classList.contains('bi-three-dots') ) this._toggleMenuVisibility( e.target );
        else if ( e.target.closest('.delete-btn') ){
            const movie = Movie.fetchParentMovie( e.target )
            this._closeAllActionMenus()
            this._getDeleteConfirmation( movie )
        };
    }

    _toggleMenuVisibility( eventSource = undefined ){
        const optMenu = ( eventSource.closest('.tbl-row-opt') || eventSource.closest('.mv-item-opt') ).querySelector('.row-opt-menu') 
        if ( optMenu.style.display != 'revert' ) this._openMenuAndManualFocus( optMenu );
        else optMenu.style.display = 'none'
    }

    _disableMovieActionsMenu( e, optMenu ){
        if( !(e.target in optMenu.children) ){
            this._toggleMenuVisibility( optMenu )
            this._disableMenuManualFocus()
        }
    }

    _openMenuAndManualFocus( optMenu ){
        this._closeAllActionMenus()
        optMenu.style.display = 'revert';
        this._enableMenuManualFocus( optMenu )
    }
    
    _closeAllActionMenus(){
        this.Register.activeRegister().querySelectorAll('.row-opt-menu').forEach( menu => menu.style.visibility = 'none' )
    }

    _enableMenuManualFocus( optMenu ){
        document.querySelector('body').addEventListener( 'click', ( e ) => this._disableMovieActionsMenu( e, optMenu ) )
        this.Register.domElement.addEventListener( 'click', ( e ) => this._disableMovieActionsMenu( e, optMenu ) )
    }
    
    _disableMenuManualFocus(){
        document.querySelector('body').removeEventListener( 'click', this._disableMovieActionsMenu )
        this.Register.domElement.removeEventListener( 'click', this._disableMovieActionsMenu )
    }

    _toggleConfirmWindow( title = undefined ){
        if ( this.confirmDelMenu.style.display != 'flex'){
            this.confirmDelMenu.style.display = 'flex'
            document.querySelector('body').classList.add('blurred')
            this.confirmDelMenu.querySelector('span').innerHTML = title
        } else {
            this.confirmDelMenu.style.display = 'none';
            document.querySelector('body').classList.remove('blurred')
        }
    }
    
    _getDeleteConfirmation( item ){
    
        // IF ITEM IS INSTANCE OF MOVIE PROCESS AS A MOVIE
        if( item.hasOwnProperty('filmID') ){
            var confimDisplayName = item.title
            this.confirmDelMenu.querySelector('.confirm-del-btns').addEventListener( 'click', ( e ) => this._deleteOnConfirm( e, item, Movie.delete, this.confirmDelMenu ),
            { once: true } )
        } 
        // IF ITEM IS INSTANCE OF CUSTOM LIST PROCESS AS A CUSTOM LIST
        else if( item instanceof CustomList ){
            var confimDisplayName = item.name
            this.confirmDelMenu.querySelector('.confirm-del-btns').addEventListener( 'click', ( e ) => this._deleteOnConfirm( e, item, CustomList.delete, this.confirmDelMenu ),
            { once: true } )
        }
    
        // MAKE THE CONFIRM WINDOW VISIBLE
        this._toggleConfirmWindow( confimDisplayName )
    }
    
    // IF USER CONFIRMATION RECIEVED, EXECUTE DELETE AND NOTIFY OBSERVERS ON RESPONSE
    // IF RESPONSE CONFIRMS ITEM IS DELETED THEN ALERT THE USER AND REFRESH PARENT COMPONENT
    async _deleteOnConfirm( e, item, deleteFunction, confirmDelMenu ){
        if ( e.target.closest('button').id == 'confirm-del' ){
            this.toggleConfirmWindow( confirmDelMenu )
            try {
                var res = await deleteFunction( item )
                if( await res.ok ){
                    this.ObserverHub.notify( {
                        alertMsg: item instanceof CustomList ? 'Collection deleted successfully' : 'Movie deleted successfully',
                        deletedItemID:  item.hasOwnProperty('filmID') ? item.filmID : undefined,
                        domComponents: {
                            register: this.Register,
                            Sidebar: this.Sidebar,
                        },
                    }, 'movieDeleted' )
                }
            } catch( err ){
                if( !res || !res.ok ){
                    this.ObserverHub.notify( { alertMsg: `Problem! Could not delete!`, res }, 'movieFailedToDelete' )
                }
                throw new Error(`Could not delete: ${ err }`)
            }
        }
        else if( e.target.closest('button').id == 'cancel-del' ) this._toggleConfirmWindow( confirmDelMenu );
    }
}
