

const isfilterOptionsOpen = filterOptionElement => filterOptionElement.classList.contains('open');
const isfilterOptionsClosed = filterOptionElement => filterOptionElement.classList.contains('closed');
const isActive = false
// const isfilterFieldContainer = ( e ) => {
//     e.target.classList.contains('filter-field') || ( (e.target) )
// }

function toggleFilterOptions( filterOptionElement ){
    if( isfilterOptionsClosed( filterOptionElement ) ) openFilterOptions( filterOptionElement )
    else if( isfilterOptionsOpen( filterOptionElement ) ) closeFilterOptions( filterOptionElement );
}

function closeFilterOptions( filterOptionElement ){
    filterOptionElement.classList.remove('open')
    filterOptionElement.classList.add('closed')
    filterOptionElement.removeEventListener( 'click', ( e ) => { handleFilterSelections( e ) } )
}

function openFilterOptions( filterOptionElement ){
    filterOptionElement.classList.remove('closed')
    filterOptionElement.classList.add('open')
    filterOptionElement.addEventListener( 'click', ( e ) => { handleFilterSelections( e ) } )
}

function handleFilterSelections( e ){
    if( e.target.classList.contains('filter-field') ) togglefilterField( e.target );
}

function togglefilterField( filterField ){
    console.log(filterField)
}

export default { toggleFilterOptions, isActive }