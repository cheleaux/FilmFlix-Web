import CustomList from './customList.js'
import Movie from './movie.js'
import customListMenu from './customListMenu.js';


// TODO: ENSURE ALL MENU INTERFACING IS UPDATED TO INTERFACE USING THE NEW CLASS
export default class MenuInterface {
    constructor( ObserverHub, Register, Sidebar ){
        this.ObserverHub = ObserverHub
        this.Register = Register
        this.Sidebar = Sidebar
    }

    _enableMovieActionsMenu( e ){
        e.stopPropagation()
        if( e.target.classList.contains('bi-three-dots') ){
            const actionMenu = this._initialiseActionMenuWindow( e.target )
            actionMenu._toggleMenuVisibility();
        }
        else if ( e.target.closest('.delete-btn') ){
            const movie = Movie.fetchParentMovie( e.target, this.Register )
            RegisterActionMenu.closeAllActionMenus( this.Register )
            this._getDeleteConfirmation( new Movie( movie.filmID, movie.title, movie.yearReleased, movie.rating, movie.duration, movie.genre ) )
        };
    }

    _getDeleteConfirmation( item ){

        const deleteWindow = this._initialiseDeleteWindow()
        // IF ITEM IS INSTANCE OF MOVIE PROCESS AS A MOVIE
        if( item instanceof Movie ){
            var itemName = item.title
            deleteWindow.domElement.querySelector('.confirm-del-btns').addEventListener( 'click', ( e ) => deleteWindow._deleteOnConfirm( e, item, Movie.delete ),
            { once: true } )
        } 
        // IF ITEM IS INSTANCE OF CUSTOM LIST PROCESS AS A CUSTOM LIST
        else if( item instanceof CustomList ){
            var itemName = item.name
            deleteWindow.domElement.querySelector('.confirm-del-btns').addEventListener( 'click', ( e ) => deleteWindow._deleteOnConfirm( e, item, CustomList.delete ),
            { once: true } )
        }
        
        // MAKE THE CONFIRM WINDOW VISIBLE
        deleteWindow._toggleConfirmWindow( itemName )
    }

    _initialiseDeleteWindow(){
        const confirmDelMenu = document.querySelector('#confirm-del-container')
        const deleteWindow = new ConfirmDeleteWindow( confirmDelMenu, this.ObserverHub, this.Register, this.Sidebar )
        return deleteWindow
    }

    _initialiseActionMenuWindow( pointer ){
        const actionMenu = new RegisterActionMenu( pointer, this.Register, this.Sidebar )
        return actionMenu
    }
}

export class ConfirmDeleteWindow {
    constructor( domElement, ObserverHub, Register, Sidebar ){
        this.domElement = domElement
        this.ObserverHub = ObserverHub
        this.Register = Register
        this.Sidebar = Sidebar
    }

    /*
        IF USER CONFIRMATION RECIEVED, EXECUTE DELETE AND NOTIFY OBSERVERS ON RESPONSE
        IF RESPONSE CONFIRMS ITEM IS DELETED THEN ALERT THE USER AND REFRESH PARENT COMPONENT
    */
    async _deleteOnConfirm( e, item, deleteFunction ){
        if ( e.target.closest('button').id == 'confirm-del' ){
            this._toggleConfirmWindow()
            try {
                var res = await deleteFunction( item )
                if( await res.ok ){
                    this.ObserverHub._notify( {
                        alertMsg: item instanceof CustomList ? 'Collection deleted successfully' : 'Movie deleted successfully',
                        deletedItemID: item.id,
                        domComponents: {
                            register: this.Register,
                            Sidebar: this.Sidebar,
                        },
                    }, 'movieDeleted' )
                }
            } catch( err ){
                if( !res || !res.ok ){
                    this.ObserverHub._notify( { alertMsg: `Problem! Could not delete!`, res }, 'movieFailedToDelete' )
                }
                throw new Error(`Could not delete: ${ err }`)
            }
        }
        else if( e.target.closest('button').id == 'cancel-del' ) this._toggleConfirmWindow();
    }
    
    _toggleConfirmWindow( title = undefined ){
        if ( this.domElement.style.display != 'flex'){
            this.domElement.style.display = 'flex'
            document.querySelector('body').classList.add('blurred')
            this.domElement.querySelector('span').innerHTML = title
        } else {
            this.domElement.style.display = 'none';
            document.querySelector('body').classList.remove('blurred')
        }
    }
}

export class RegisterActionMenu {
    constructor( pointer, Register, Sidebar ){
        this.windowElement = ( pointer.closest('.tbl-row-opt') || pointer.closest('.mv-item-opt') ).querySelector('.row-opt-menu')
        this.Register = Register
        this.Sidebar = Sidebar
    }
    
    _toggleMenuVisibility(){
        if ( this.windowElement.style.display != 'revert' ) this._openMenuAndManualFocus( );
        else this.windowElement.style.display = 'none'
    }
      
    _openMenuAndManualFocus(){
        RegisterActionMenu.closeAllActionMenus( this.Register )
        this.windowElement.style.display = 'revert';
        this._enableMenuManualFocus()
    }
    
    _enableMenuManualFocus(){
        document.querySelector('body').addEventListener( 'click', this._disableMovieActionsMenu )
        this.Register.domElement.addEventListener( 'click', this._disableMovieActionsMenu )
    }
    
    _disableMenuManualFocus(){
        document.querySelector('body').removeEventListener( 'click', this._disableMovieActionsMenu )
        this.Register.domElement.removeEventListener( 'click', this._disableMovieActionsMenu )
    }
    
    _disableMovieActionsMenu( e ){
        console.log( this.windowElement )
        if( !( e.target in this.windowElement.children ) ){
            this._toggleMenuVisibility()
            this._disableMenuManualFocus()
        }
    }

    static closeAllActionMenus( Register ){
        Register.activeRegister().querySelectorAll('.row-opt-menu').forEach( menu => menu.style.visibility = 'none' )
    }
}