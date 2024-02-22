import CustomList from "./customList.js";


function getDomElement(){
    const domElement = document.querySelector('.list-menu')
    return domElement
}

function displayListMembers( e, register ){
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
    const menuOptions = Array.from( getDomElement().children )
    menuOptions.forEach( ( element ) => {
        if( element.classList.contains('tab-focus') ) CustomList._toggleActiveStatus( element );
    })
    CustomList._toggleActiveStatus( listOpt )
}

function renderListMenu() {
    const listData = CustomList.fetchMetaData()
    listData.then( data => {
        data.forEach( item => {
            const customList = new CustomList( item.list_id, item.name, item.movie_count )
            getDomElement().insertAdjacentElement( 'beforeend', customList._constructListMrnuItemHTML() )
    })})
    .catch( err => console.log(err) )
}

function setMainMovieListQuantity( quantity ){
    const AllMoviesOption = document.querySelector('#all-movies-menu-opt')
    AllMoviesOption.querySelector('.quantity').innerHTML = String(quantity)
}

export default { renderListMenu, displayListMembers, getDomElement };