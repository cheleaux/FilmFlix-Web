import taskbar from './taskbar.js'
import customListMenu from './customListMenu.js'

export default class Sidebar{
    constructor( domElement ){
        this.domElement = domElement
        this.taskbarElement = taskbar.getDomElement()
        this.filterElement = this.domElement.querySelector('.filter-options')
        this.listMenuElement = customListMenu.getDomElement()
    }

    _formatAndRenderContent( register, mediaQueries ){
        this._formatForScreenWidth( mediaQueries )
        taskbar.setFormatIcon( register )
        customListMenu.renderListMenu()
    }

    _handleUserAction( e, register ){
        if( this.taskbarElement.contains( e.target ) ) taskbar.handleUserTask( e, register, this.filterElement );
        else if( this.listMenuElement.contains( e.target ) ) customListMenu.displayListMembers( e, register );
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