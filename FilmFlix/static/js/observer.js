import { flashAlert } from './sidebar.js'


class Observer {
    update( event, data ){
        // VERIFY EVENT RELEVANCE
        // PROCESS DATA IN ACCORDANCE WITH EVENT CONTEXT AND DATA
    }
}

// TODO: INSTANTIATE AND INTEGRATE OBSERVERS INTO MAIN APP LOGIC 'index.js'
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

    notify( data, event ){
        if( this.observers.has( event ) ){
            for( const observer of this.observers.get( event ) ){
                observer.update( event, data )
            }
        }
    }
}


export class AlertObserver extends Observer {
    update( event, data ){
        try {
            if( event === 'movieDeleted' || event === 'listDeleted' || event === 'movieFailedToDelete' ) flashAlert( data.alertMsg );
        } catch( err ){
            console.error(`User-Action Report Error: ${ err }`)
        }
    }
}
