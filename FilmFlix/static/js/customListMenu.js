import CustomList from "./customList.js"
import { confirmListDelete } from "./menu.js"

function getDomElement(){
    const domElement = document.querySelector('.list-menu')
    return domElement
}

function displayListMembers( e, Register ){
    if( !e.target ) return;
        const listOpt = e.target.closest('.list-menu-opt')
    if( listOpt ){
        const listId = listOpt.dataset.list
        switchActiveListStatus( listOpt )
        if( listId == 0 ){ Register.filterActive ? Register._populateRegister( { filterActive: true } ) : Register._populateRegister() }
        else {
            const customMovies = CustomList.fetchCustomListMovies( listId )
            customMovies.then( movies => Register.filterActive ? Register._populateRegister( movies, { filterActive: true } ) : Register._populateRegister( movies ) )
            console.log(`filter active: ${ Register.filterActive }`)
        }
    };
}

function toggleDeleteSelection( deleteListBtn ){
    const domElement = getDomElement() 
    domElement.classList.contains('delete-mode') ? deactivateListDeleteMode( domElement, deleteListBtn ) : activateListDeleteMode( domElement, deleteListBtn );
}

function deactivateListDeleteMode( domElement, deleteListBtn ){
    console.log('in deactivate function')
    domElement.classList.remove('delete-mode')
    deleteListBtn.classList.remove('active')
    domElement.removeEventListener( 'click', requestListDeletion )
}

function activateListDeleteMode( domElement, deleteListBtn ){
    deleteListBtn.classList.add('active')
    domElement.classList.add('delete-mode')
    domElement.addEventListener( 'click', requestListDeletion )
}

function requestListDeletion( e ){
    if( !e.target.classList.contains('del-list-btn') ) return;
    const listToDelete = e.target.closest('.list-menu-opt')
    const listID = listToDelete.dataset.list
    const listName = listToDelete.querySelector('.list-name').innerHTML
    const list = new CustomList( listName, undefined, undefined, listID )
    confirmListDelete( list )
    console.log(`requesting confirmation to delete list ${ listName }`)
}

function switchActiveListStatus( listOpt ){
    const menuOptions = Array.from( getDomElement().children )
    menuOptions.forEach( ( element ) => {
        if( element.classList.contains('tab-focus') ) CustomList._toggleActiveStatus( element );
    })
    CustomList._toggleActiveStatus( listOpt )
}

function renderListMenu( { length } = {} ) {
    const listData = CustomList.fetchMetaData()
    length ? setMainListQuantity( length ) : null;
    listData.then( data => {
        data.forEach( item => {
            const customList = new CustomList( item.name, item.movie_count, undefined, item.list_id  )
            getDomElement().insertAdjacentElement( 'beforeend', customList._constructListMenuItemHTML() )
    })})
    .catch( err => console.log(err) )
}

function setMainListQuantity( quantity ){
    const AllMoviesOption = document.querySelector('#all-movies-menu-opt')
    AllMoviesOption.querySelector('.quantity').innerHTML = String(quantity)
}

export default { renderListMenu, displayListMembers, getDomElement, toggleDeleteSelection };