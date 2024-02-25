
const isfilterOptionsOpen = filterOptionElement => filterOptionElement.classList.contains('open');
const isfilterOptionsClosed = filterOptionElement => filterOptionElement.classList.contains('closed');
const isfilterFieldOpen = filterField => filterField.classList.contains('open')
const isfilterFieldClosed = filterField => filterField.classList.contains('closed')
const isDurationFilter = filterGroup => ( filterGroup.id && filterGroup.id.toLowerCase().includes('duration') )
const hasInput = filterGroup => ( ( filterGroup.type === 'number' && filterGroup.value ) || ( filterGroup.type === 'checkbox' && filterGroup.checked ) )
const durationInputTemplate = ( { min, max }, fieldName ) => `
        <span><input type="number" name="${ fieldName }Min" id="${ fieldName }MinInp" style="margin-right: 0.35rem;" /> <label for="${ fieldName }MinInp">min</span>
        <span><input type="number" name="${ fieldName }Max" id="${ fieldName }MaxInp" style="margin-right: 0.35rem;" /> <label for="${ fieldName }MaxInp">max</span>
    `
const defaultInputTemplate = ( value, fieldName, id ) => `
        <input type="checkbox" value="${ value }" name="${ fieldName }" id="${ fieldName }Inp-${ id }" />
        <label for="${ fieldName }Inp">${value}</label>
    `
const isActive = false


// MAIN FILTER SECTION ELEMENT HANDLER
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

// FILTER FIELD ELEMENT HANDLER
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

// ACCEPTS A STRING NAMING THE MOVIE PROPERTY WHICH THE FIELD REPRESENTS
// AND THE VALUE TO BE DISPLAYED IN THE LABEL (FOR DURATION 'value' SHOULD BE AN OBJECT WITH 'max' AND 'min' PROPS)
function constructFieldSelectionHTML( value, fieldName, id = undefined ){
    const filterValueSelection = document.createElement( 'div' )
    filterValueSelection.classList.add('filter-selection', 'flex')
    filterValueSelection.innerHTML = fieldName === 'duration' ? durationInputTemplate( value, fieldName ) : defaultInputTemplate( value, fieldName, id ) ;
    return filterValueSelection
} 

function renderfilterFields( filterOptionElement, movieListMetaData ){
    const filterFields = filterOptionElement.querySelectorAll('.filter-field')
    filterFields.forEach( field => {
        const fieldOptionsContainer = field.querySelector('.filter-field-opts')
        renderFieldOptions( field, fieldOptionsContainer, movieListMetaData )
    } )
}

// ACCEPTS THE IDENTIFIABLE FIELD ELEMENT, THE CONTAINER TO RENDER IN AND THE FILTERABLES OBJECT
// RENDERS THE SPECIAL INPUT TEMPLATE FOR 'duration' FIELD AND A DEFAULT TEMPLATE FOR ALL OTHER FIELDS
function renderFieldOptions( field, optionContainerElement, { filterables } ){
    for( const key of Object.keys( filterables ) ){
        if( key === field.id && key !== 'duration' ){
            for( const value of filterables[key] ){
                const id = filterables[key].indexOf(value) + 1
                optionContainerElement.appendChild( constructFieldSelectionHTML( value, key, id ) )
        }} else if( key === field.id && key === 'duration' ){
            const minMax = { min: Math.min(...filterables[key]), max: Math.max(...filterables[key]) }
            optionContainerElement.appendChild( constructFieldSelectionHTML( minMax, key ) )
        }
    }
}

// CLASS FACTORY FUNCTION THAT BUILDS AN OBJECT WITH ARRAYS KEYED TO ALL FILTERABLE MOVIE PROPERTIES
export function Filterables( duration = undefined, yearReleased = undefined, rating = undefined, genre = undefined ){
    this.duration = duration || []
    this.yearReleased = yearReleased || []
    this.genre = genre || []
    this.rating = rating || []
}

function getFilters( formElements ){
    const arr = [ formElements['rating'], formElements['genre'], formElements['yearReleased'], formElements['durationMin'], formElements['durationMax'] ]
    const filterValues = { rating: [], genre: [], yearReleased: [], duration: { min: '', max: '' } }
    arr.forEach( ( filterGroup ) => {
        if( isDurationFilter( filterGroup ) && hasInput( filterGroup ) ) insertInputsIntoFilterValuesDurationProperties( filterGroup, filterValues.duration );
        else insertInputsIntoFilterValues( filterGroup, filterValues )
    } )
    return filterValues
}

function insertInputsIntoFilterValues( filterGroup, filterValues ){
    for( const key of Object.keys( filterGroup ) ){
        const filterInp = filterGroup[key]
        if( hasInput( filterInp ) ){
            const filterValuesKeyReference = filterInp.name
            filterValues[filterValuesKeyReference].push( filterInp.value )
        }
    }
}

function insertInputsIntoFilterValuesDurationProperties( filterInp, durationFilterObj ){
    for( const key of Object.keys( durationFilterObj ) ){
        if( filterInp.id.toLowerCase().includes( key ) ) durationFilterObj[key] = filterInp.value 
    }
}

export default { toggleFilterOptions, isActive, renderfilterFields, getFilters }