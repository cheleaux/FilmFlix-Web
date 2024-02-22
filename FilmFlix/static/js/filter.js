
const isfilterOptionsOpen = filterOptionElement => filterOptionElement.classList.contains('open');
const isfilterOptionsClosed = filterOptionElement => filterOptionElement.classList.contains('closed');
const isfilterFieldOpen = filterField => filterField.classList.contains('open')
const isfilterFieldClosed = filterField => filterField.classList.contains('closed')
const isActive = false


function toggleFilterOptions( filterOptionElement ){
    if( isfilterOptionsClosed( filterOptionElement ) ) openFilterOptions( filterOptionElement )
    else if( isfilterOptionsOpen( filterOptionElement ) ) closeFilterOptions( filterOptionElement );
}

function closeFilterOptions( filterOptionElement ){
    filterOptionElement.classList.remove('open')
    filterOptionElement.classList.add('closed')
    filterOptionElement.removeEventListener( 'click', ( e ) => { handleFieldSelections( e ) } )
}

function openFilterOptions( filterOptionElement ){
    filterOptionElement.classList.remove('closed')
    filterOptionElement.classList.add('open')
    filterOptionElement.addEventListener( 'click', ( e ) => { handleFieldSelections( e ) } )
}

function handleFieldSelections( e ){
    if( e.target.classList.contains('filter-label') ){
        const filterField = e.target.closest('.filter-field')
        togglefilterField( filterField );
    }
    // HANDLE THE FILTER EVENT WITH THE SIDEBAR USING THE FILTER AS API
}

function togglefilterField( filterField ){
    if( !filterField ) return;
    if( isfilterFieldClosed( filterField ) ) openFilterField( filterField )
    else if( isfilterFieldOpen( filterField ) ) closeFilterField( filterField )
}

function openFilterField( filterField ){
    filterField.classList.remove('closed')
    filterField.classList.add('open')
}

function closeFilterField( filterField ){
    filterField.classList.remove('open')
    filterField.classList.add('closed')
}

function constructFieldSelectionHTML( value, fieldName ){
    const filterValueSelection = document.createElement( 'div' )
    filterValueSelection.classList.add('filter-selection', 'flex')
    filterValueSelection.innerHTML = `
        <input type="checkbox" value="${ value }" name="${ fieldName }" id="${ fieldName }Inp" />
        <label for="${ fieldName }Inp">${value}</label>
    `
    return filterValueSelection
}

function renderfilterFields( filterOptionElement, movieListMetaData ){
    const filterFields = filterOptionElement.querySelectorAll('.filter-field')
    filterFields.forEach( field => {
        const fieldOptionsContainer = field.querySelector('.filter-field-opts')
        renderFieldOptions( field, fieldOptionsContainer, movieListMetaData )
    } )
}

function renderFieldOptions( field, optionContainerElement, { filterables } ){
    for( const key of Object.keys( filterables ) ){
        if( key !== field.id ) continue;
        for( const value of filterables[key] ){
            optionContainerElement.appendChild( constructFieldSelectionHTML( value, key ) )
        }
    }
}

export function Filterables( duration = undefined, yearReleased = undefined, rating = undefined, genre = undefined ){
    this.duration = duration || []
    this.yearReleased = yearReleased || []
    this.genre = genre || []
    this.rating = rating || []
}

export default { toggleFilterOptions, isActive, renderfilterFields }