import Observer from './observer.js'

// TODO: INSTANTIATE AND INTEGRATE OBSERVERS INTO MAIN APP LOGIC 'index.js'
export class SidebarRefreshObserver extends Observer {
    update( event, data ){
        try {
            switch( event ){
                case 'movieDeleted' || 'listDeleted':
                    data.domComponents.Sidebar._refreshElement(['listMenu'])
                case'filterablesChanged':
                    data.domComponents.Sidebar.filterComponent._renderfilterFields( { filterables: data.filterables } )
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
                    data.domComponents.Register._removeMovie( data.deleteItemID )
                    data.domComponents.Register._refreshElement([ 'rootFetch', 'filterables' ])
                } catch( err ){
                    console.error(`Refresh Error: Could not refresh register\n${ err }`)
                }
            case 'rootMovieFetchChanged':
                try {
                    const activeListID = customListMenu.fetchActiveList().dataset.list
                    if( activeListID === 0 ){
                        data.Register.filterActive ? data.Register._populateRegister( { filterActive: true, rootFetch: True } ) : data.Register._populateRegister( { rootFetch: True } ) ;
                    }
                } catch( err ){
                    if( !activeListID ) console.error(`Refresh Error: Could not find active collection ID. Check if collection is active and still exists\n${ err }`)
                    else console.error(`Refresh Error: ${ err }`)
                }
    }}
}