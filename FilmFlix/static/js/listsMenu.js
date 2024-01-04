import CustomList from './CustomList.js'
import MovieList from './movieList.js'

const CustomListMenuEl = document.querySelector('.list-menu')

function displayListResults( e ){
    if( !e.target ) return;
        const listOpt = e.target.closest('.list-menu-opt')
    if( listOpt ){
        const listId = listOpt.dataset.list
        switchActiveStatus( listOpt )
        if(listId == 0){ MovieList.populateTable() }
        else {
            const customMovies = CustomList._fetchCustomListMovies( listId )
            customMovies.then( movies => MovieList.populateTable(movies))
        }
        

        // DISPLAY THE MOVIES ONCE THE DATA IS RECIEVED
        // MovieList.populateTable( customMovies )
    };
}

function renderListMenu() {
    const listData = fetchListData()
    listData.then( data => data.forEach( item => {
        const customList = new CustomList( item.Id, item.name, item.quantity )
        CustomListMenuEl.insertAdjacentElement( 'beforeend', customList.constructListOptionHTML() )
    }))
    .catch( err => console.log(err) )
}

async function fetchListData() {
    const listsRetrievalURL = '/api/custom-list/all'
    try {
        const listData = await fetch( listsRetrievalURL).then( data => data.json() )
        return listData
    } catch (err) {
        console.log(err)
    }
}

function switchActiveStatus( listOpt ){
    const menuOptions = Array.from( CustomListMenuEl.children )
    menuOptions.forEach( ( element ) => {
        if( element.classList.contains('tab-focus') ) CustomList._toggleActiveStatus( element );
    })
    CustomList._toggleActiveStatus( listOpt )
}

const exports = { renderListMenu, displayListResults, CustomListMenuEl }
export default exports;