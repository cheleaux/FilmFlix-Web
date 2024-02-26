import taskbar from './taskbar.js'
import filter from './filter.js'
import customListMenu from './customListMenu.js'

export default class Sidebar{
    constructor( domElement ){
        this.domElement = domElement
        // TASKBAR DOM ELEMENT GETTER
        this.taskbarElement = taskbar.getDomElement()
        // FILTERS DOM ELEMENT GETTER
        this.filterElement = this.domElement.querySelector('.filter-options')
        // LIST MENU DOM ELEMENT GETTER
        this.listMenuElement = customListMenu.getDomElement()
    }

    _formatAndRenderContent( Register, mediaQueries ){
        this._formatForScreenWidth( mediaQueries )
        taskbar.setFormatIcon( Register )
        customListMenu.renderListMenu()
        filter.renderfilterFields( this.filterElement, Register.mainListMeta )
    }

    _handleUserAction( e, Register ){
        if( this.taskbarElement.contains( e.target ) ) taskbar.handleUserTask( e, Register, this.filterElement );
        else if( this.listMenuElement.contains( e.target ) ) customListMenu.displayListMembers( e, Register );
        else if( e.target.classList.contains('apply-filter-btn') ) filter.filterMovies( Register.listContent, document.forms['filter-form'].elements );
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
}