import Observer from './observer.js'
import { flashAlert } from './sidebar.js'

// DISPLAY CRITICAL USER-TRIGGERED PROCESSESOUTCOMES USING SIDEBAR 'flashAlert' METHOD
export class AlertObserver extends Observer {
    update( event, data ){
        try {
            switch( event ){
                case 'movieDeleted' || 'listDeleted' || 'movieFailedToDelete' || 'listFailedToDelete':
                    flashAlert( data.alertMsg )
            }
        } catch( err ){
            console.error(`User-Action Report Error: ${ err }`)
        }
    }
}