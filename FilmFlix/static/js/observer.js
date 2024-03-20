import FilterComponent from './filterComponent.js';
import { flashAlert, refreshElement } from './sidebar.js'


class Observer {
    update( event, data ){
        // VERIFY EVENT RELEVANCE
        // PROCESS DATA IN ACCORDANCE WITH EVENT CONTEXT AND DATA
    }
}

export class ObserverHub {
    constructor(){
        this.observers = new Map()
    }

    subscibe( observer, event ){
        if( this.observers.has( event ) ){
            this.observers.get( event ).add( observer )
        } else {
            this.observers.set( event, new Set( observer ) )
        }
    }

    removeObserver( observer, event ){
        if( this.observers.has( event ) ) this.observers.get( event ).delete( observer );
    }

    notify( event, data ){
        if( this.observers.has( event ) ){
            for( const observer of this.observers.get( event ) ){
                observer.update( event, data )
            }
        }
    }
}


export class AlertObserver extends Observer {
    update( event, data ){
        if( event === 'movieDeleted' || event === 'listDeleted' ){
            try {
                flashAlert( data.alertMsg )
            } catch( err ){
                console.error(`User-Action Report Error: ${ err }`)
            }
        }
    }
}

export class SidebarRefreshObserver extends Observer {
    update( event, data ){
        if( event === 'movieDeleted' ){
            refreshElement('listMenu')
            FilterComponent._renderfilterFields( movieListMetaData )
            Register._refreshElement('rootFetch')
        }
        if( event === 'listDeleted' ){
            refreshElement('listMenu')
        }
    }
}

export class RegisterRefreshObserver extends Observer {}