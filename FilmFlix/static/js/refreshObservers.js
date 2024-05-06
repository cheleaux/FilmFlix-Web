import Observer from './observer.js'
import customListMenu from './customListMenu.js'
// TODO: INSTANTIATE AND INTEGRATE OBSERVERS INTO MAIN APP LOGIC 'index.js'
export class SidebarRefreshObserver extends Observer {
    update( event, data ){
        try {
            switch( event ){
                case 'movieDeleted' || 'listDeleted':
                    data.domComponents.Sidebar._refreshElement(['listMenu'])
                case'filterablesChanged':
                    const registerfilterables = data.domComponents.Register.mainListMeta.filterables
                    data.domComponents.Sidebar.filterComponent._renderfilterFields( { filterables: registerfilterables } )
        }} catch( err ){
            console.error(`Refresh Error: Could not refresh Sidebar\n${ err }`)
        }
    }
}

// TODO: INSTANTIATE AND INTEGRATE OBSERVERS INTO MAIN APP LOGIC 'index.js'
export class RegisterRefreshObserver extends Observer {
    update( event, data ){
        switch( event ){
            case 'movieDeleted':
                try {
                    const registerObj = data.domComponents.Register
                    const sidebarObj = data.domComponents.Sidebar
                    registerObj._refreshElement([ 'rootFetch', 'filterables' ], sidebarObj)
                    registerObj._removeMovie( data.deletedItemID )
                } catch( err ){
                    console.error(`Refresh Error: Could not refresh register\n${ err }`)
                }
            case 'rootMovieFetchChanged':
                try {
                    const activeListID = customListMenu.fetchActiveList().dataset.list
                    if( activeListID === 0 ){
                        data.domComponents.register.filterActive ? data.domComponents.register._populateRegister( { filterActive: true, rootFetch: True } ) : data.domComponents.register._populateRegister( { rootFetch: True } ) ;
                    }
                } catch( err ){
                    if( !activeListID ) console.error(`Refresh Error: Could not find active collection ID. Check if collection is active and still exists\n${ err }`)
                    else console.error(`Refresh Error: ${ err }`)
                }
    }}
}