import CustomList from "./customList.js"
import FilterComponent from "./FilterComponent.js"

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
            console.log(`filter status: ${Register.filterActive}`)
        }
    };
}

function switchActiveListStatus( listOpt ){
    const menuOptions = Array.from( getDomElement().children )
    menuOptions.forEach( ( element ) => {
        if( element.classList.contains('tab-focus') ) CustomList._toggleActiveStatus( element );
    })
    CustomList._toggleActiveStatus( listOpt )
}

function renderListMenu( { length } ) {
    const listData = CustomList.fetchMetaData()
    setMainListQuantity( length )
    listData.then( data => {
        data.forEach( item => {
            const customList = new CustomList( item.list_id, item.name, item.movie_count )
            getDomElement().insertAdjacentElement( 'beforeend', customList._constructListMrnuItemHTML() )
    })})
    .catch( err => console.log(err) )
}

function setMainListQuantity( quantity ){
    const AllMoviesOption = document.querySelector('#all-movies-menu-opt')
    AllMoviesOption.querySelector('.quantity').innerHTML = String(quantity)
}

export default { renderListMenu, displayListMembers, getDomElement };