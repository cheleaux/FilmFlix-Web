import { setFormatIcon, handleUserTask, getTaskbarDomElement } from './taskbar.js'
import customListMenu from './customListMenu.js'
import FilterComponent from './filterComponent.js'
export default class Sidebar{
    constructor( domElement ){
        this.domElement = domElement
        // TASKBAR DOM ELEMENT GETTER
        this.taskbarElement = getTaskbarDomElement()
        // FILTER COMPONENT INSTANCE
        this.filterComponent = this._initialiseFilterComponent()
        // LIST MENU DOM ELEMENT GETTER
        this.listMenuElement = customListMenu.getDomElement()
        // ALERT BOX
        this.alert = domElement.querySelector('.alert-msg-box')
    }

    _initialiseFilterComponent(){
        const filterElement = this.domElement.querySelector('.filter-options')
        const filterComponent = new FilterComponent( filterElement )
        return filterComponent
    }

    _formatAndRenderContent( Register, mediaQueries ){
        this._formatForScreenWidth( mediaQueries )
        setFormatIcon( Register )
        customListMenu.renderListMenu( Register.mainListMeta )
        this.filterComponent._renderfilterFields( Register.mainListMeta )
    }

    _handleUserAction( e, Register, Menus ){
        if( this.taskbarElement.contains( e.target ) ) handleUserTask( e, Register, this, Menus );
        else if( this.listMenuElement.contains( e.target ) && !e.target.classList.contains('del-list-btn') ) customListMenu.displayListMembers( e, Register );
        else if( e.target.classList.contains('apply-filter-btn') ) Register._populateRegister( { filterActive: true } );
    }

    _formatForScreenWidth( queries ){
        if( this._isWithinQueryRange( '1090', queries ) ) this._activeConcealableSidebar( 'open', this.domElement );
        else if( this._isWithinQueryRange( '770', queries ) ) this._activeConcealableSidebar( 'closed', this.domElement );
        else this._deactiveConcealableSidebar( this.domElement );
    }
    
    _isWithinQueryRange( widthRangeStart, queries ){
        if( widthRangeStart == '1090' ) return ( queries.screenQuery1090.matches && !queries.screenQuery770.matches );
        else if( widthRangeStart == '770' ) return ( queries.screenQuery770.matches );
    }

    _activeConcealableSidebar( lockState,){
        this.domElement.classList.add('concealable')
        if( lockState == 'open' ) this._openSidebar( this.domElement ); 
        else if( lockState == 'closed' ) this._closeSidebar( this.domElement );
        this.domElement.addEventListener( 'click', ( e ) => { this._toggleSidebarVisibily( e, this.domElement ) } )
    }

    _deactiveConcealableSidebar(){
        this.domElement.classList.remove('concealable')
        this.domElement.classList.contains('open') ? this.domElement.classList.remove('open') : this.domElement.classList.remove('closed');
        this.domElement.removeEventListener( 'click', ( e ) => { this._toggleSidebarVisibily( e, this.domElement ) } )
    }

    _toggleSidebarVisibily( e ){
        const toggleBtn = e.target.classList.contains('sidebar-toggler') ? e.target : e.target.closest('sidebar-toggler')
        if( !toggleBtn ) return;
        if( toggleBtn.classList.contains('sidebar-close') ) this._closeSidebar( this.domElement )
        else if( toggleBtn.classList.contains('sidebar-open') ) this._openSidebar( this.domElement );
    }

    _openSidebar(){
        if( this.domElement.classList.contains('open') ) return;
        this.domElement.classList.remove('closed')
        this.domElement.classList.add('open')
    }

    _closeSidebar(){
        if( this.domElement.classList.contains('closed') ) return;
        this.domElement.classList.remove('open')
        this.domElement.classList.add('closed')
    }

    
    _refreshElement( elements ){
        elements.forEach( ( element ) => {
            switch( element ){
                case 'listMenu':
                    customListMenu.clear()
                    customListMenu.renderListMenu()          
            }
        })
    }

    static flashAlert( msg ){
        // DISPLAY ALERT MSG
        const alert = document.querySelector('.alert-msg-box')

        // VISIBILITY TOGGLE FUNCTION USED TO ADD AND REMOVE LISTENER
        const toggleVisibilty = () => {
            alert.style.display = 'none'
            alert.removeEventListener( 'click', toggleVisibilty )
        }

        alert.style.display = 'flex';
        alert.querySelector('.alert-msg').innerHTML = msg;
        alert.addEventListener( 'click', toggleVisibilty )
    }
}
        
export const flashAlert = Sidebar.flashAlert
export const refreshElement = Sidebar.refreshElement