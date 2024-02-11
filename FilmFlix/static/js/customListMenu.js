import CustomList from "./CustomList.js";


const domElement = document.querySelector('.list-menu')

function displayListResults( e, register ){
    if( !e.target ) return;
        const listOpt = e.target.closest('.list-menu-opt')
    if( listOpt ){
        const listId = listOpt.dataset.list
        switchActiveListStatus( listOpt )
        if(listId == 0){ register._populateRegister() }
        else {
            const customMovies = CustomList.fetchCustomListMovies( listId )
            customMovies.then( movies => register._populateRegister( movies ))
        }
    };
}

function switchActiveListStatus( listOpt ){
    const menuOptions = Array.from( domElement.children )
    menuOptions.forEach( ( element ) => {
        if( element.classList.contains('tab-focus') ) CustomList._toggleActiveStatus( element );
    })
    CustomList._toggleActiveStatus( listOpt )
}

function renderListMenu() {
    const listData = CustomList.fetchMetaData()
    listData.then( data => data.forEach( item => {
        const customList = new CustomList( item.list_id, item.name, item.movie_count )
        domElement.insertAdjacentElement( 'beforeend', customList._constructListMrnuItemHTML() )
    }))
    .catch( err => console.log(err) )
}

export default { renderListMenu, displayListResults, domElement };