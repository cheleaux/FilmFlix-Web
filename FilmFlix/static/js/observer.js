
/*
OBSERVER ABSTRACT CLASS DEFINED ALL OBSERVER INTERFACE MINIMUM REQIREMENTS. EXPAND ADVISED IF NECESSARY
- ( REQUIRED ) ~ 'update' METHOD TRIGGERS ALL ACTIONS THAT THE APPLICATION REQUIRES TO FOLLOW THE EVENT
- INDIVIUAL OBSERVERS ARE CREATE ON A PER COMPONENT RESPONSE BASIS. EACH MANAGES A PARTICULAR RESPONSE
    OF COMPONENT. A RESPONSE CAN BE TRIGGER BY ANY NUMBER OF RELEVENT EVENTS.
*/
class Observer {
    update( event, data ){
        // VERIFY EVENT RELEVANCE
        // PROCESS DATA IN ACCORDANCE WITH EVENT CONTEXT AND DATA
    }
}



/*
USE THE OBSERVERS HUB TO MANAGE ALL ACTIVE OBSERVERS. ASSIGN, REMOVE AND NOTIFY ALL RELEVANT ENTITIES AN EVENT IS EMITTED.
OBSERVERS ARE STORED IN ARRAYS KEYED TO A SIGNLE EVENT IN A MAP. OBSERVERS CAN BE MAPPED TO MORE THAN ONE EVENT,
AND ONLY ONCE PER EVENT 
*/
export default class ObserverHub {
    constructor(){
        this.observers = new Map()
    }

    // ASSIGN ONE OR MORE OBSERVERS TO A LISTEN FOR A SINGLE EVENT, 'pbservers' IS ALWAYS AN ARRAY
    _subscribe( observers, event ){
        observers.forEach( observer => {
            if( this.observers.has( event ) ) this._insertObserver( event, observer );
            else this.observers.set( event, new Set().add( observer ) )
        })
    }

    // REMOVE AN OBSERVER FROM AN EVENTS EMIT LIST
    _removeObserver( observer, event ){
        if( this.observers.has( event ) ) this.observers.get( event ).delete( observer );
    }

    // BROADCAST AN EVENT TO ALL LISTENING OBSERVERS WITH A RESOURCE DATA PACKET WITH ALL OBERSERVER RECIEVE
    _notify( data, event ){
        if( this.observers.has( event ) ){
            for( const observer of this.observers.get( event ) ){
                observer.update( event, data )
            }
        }
    }
    _insertObserver( event, observer ){
        if( this.observers.get( event ).has( observer ) ){
            console.error(`Observer Hub Subcription Error: observer is alread subscribed to this event!`)
        } else this.observers.get( event ).add( observer )
    }
}