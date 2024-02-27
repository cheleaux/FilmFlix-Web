

export default class FilterComponent {
    constructor( domElement ){
        this.domElement = domElement
        this.isfilterOptionsOpen = () => this.domElement.classList.contains('open');
        this.isfilterOptionsClosed = () => this.domElement.classList.contains('closed');
        this.isfilterFieldOpen = filterField => filterField.classList.contains('open');
        this.isfilterFieldClosed = filterField => filterField.classList.contains('closed');
        this.isDurationField = key => key === 'duration';
        this.durationInputTemplate = ( fieldName ) => `
        <span><input type="number" name="${ fieldName }Min" id="${ fieldName }MinInp" style="margin-right: 0.35rem;" /> <label for="${ fieldName }MinInp">min</span>
        <span><input type="number" name="${ fieldName }Max" id="${ fieldName }MaxInp" style="margin-right: 0.35rem;" /> <label for="${ fieldName }MaxInp">max</span>
        `
        this.defaultInputTemplate = ( value, fieldName, id ) => `
        <input type="checkbox" value="${ value }" name="${ fieldName }" id="${ fieldName }Inp-${ id }" />
        <label for="${ fieldName }Inp">${ value }</label>
         `
    }

    // MAIN FILTER SECTION ELEMENT HANDLER
    _toggleFilterOptions(){
        if( this.isfilterOptionsClosed() ) this._openFilterOptions()
        else if( this.isfilterOptionsOpen() ) this._closeFilterOptions();
    }

    _closeFilterOptions(){
        this.domElement.classList.remove('open')
        this.domElement.classList.add('closed')
        this.domElement.removeEventListener( 'click', ( e ) => { this._handleFieldSelections( e ) } )
    }
    
    _openFilterOptions(){
        this.domElement.classList.remove('closed')
        this.domElement.classList.add('open')
        this.domElement.addEventListener( 'click', ( e ) => { this._handleFieldSelections( e ) } )
    }
    
    // FILTER FIELD ELEMENT HANDLER
    _handleFieldSelections( e ){
        if( e.target.classList.contains('filter-label') ){
            const filterField = e.target.closest('.filter-field')
            this._togglefilterField( filterField );
        }
    }

    _togglefilterField( filterField ){
        if( !filterField ) return;
        if( this.isfilterFieldClosed( filterField ) ) this._openFilterField( filterField )
        else if( this.isfilterFieldOpen( filterField ) ) this._closeFilterField( filterField )
    }

    _openFilterField( filterField ){
        filterField.classList.remove('closed')
        filterField.classList.add('open')
    }

    _closeFilterField( filterField ){
        filterField.classList.remove('open')
        filterField.classList.add('closed')
    }

    _renderfilterFields( movieListMetaData ){
        const filterFields = this.domElement.querySelectorAll('.filter-field')
        filterFields.forEach( field => {
            const fieldOptionsContainer = field.querySelector('.filter-field-opts')
            this._renderFieldOptions( field, fieldOptionsContainer, movieListMetaData )
        })
    }
    
    static getUserFilterSelections(){
        const formElements = document.forms['filter-form'].elements
        const arr = [ formElements['rating'], formElements['genre'], formElements['yearReleased'], formElements['durationMin'], formElements['durationMax'] ]
        return arr
    }

    // ACCEPTS THE FIELD ELEMENT, IT'S CHILD CONTAINER TO RENDER IN AND THE FILTERABLES OBJECT
    // RENDERS THE SPECIAL INPUT TEMPLATE FOR 'duration' FIELD AND A DEFAULT TEMPLATE FOR ALL OTHER FIELDS
    _renderFieldOptions( field, optionContainerElement, { filterables } ){
        for( const key of Object.keys( filterables ) ){
            if( key === field.id && !this.isDurationField( key ) ) this._insertDefaultTemplateFieldOption( key, filterables[key], optionContainerElement );
            else if( key === field.id && this.isDurationField( key ) ) this._insertDurationTemplateFieldOption( key, optionContainerElement )
        }
    }

    _insertDefaultTemplateFieldOption( key, filterFieldOptions, optionContainerElement ){
        for( const optionValue of filterFieldOptions ){
            const id = filterFieldOptions.indexOf( optionValue ) + 1
            optionContainerElement.appendChild( this._constructFieldSelectionHTML( key, optionValue, id ))
        }
    }

    _insertDurationTemplateFieldOption( key, optionContainerElement ){
        optionContainerElement.appendChild( this._constructFieldSelectionHTML( key ) )
    }
    
    // ACCEPTS A STRING NAMING THE MOVIE PROPERTY WHICH THE FIELD REPRESENTS
    // AND THE VALUE TO BE DISPLAYED IN THE LABEL (FOR DURATION 'value' SHOULD BE AN OBJECT WITH 'max' AND 'min' PROPS)
    _constructFieldSelectionHTML( fieldName, value = null, id = undefined ){
        const filterValueSelection = document.createElement( 'div' )
        filterValueSelection.classList.add('filter-selection', 'flex')
        filterValueSelection.innerHTML = fieldName === 'duration' ? this.durationInputTemplate( fieldName ) : this.defaultInputTemplate( value, fieldName, id ) ;
        return filterValueSelection
    } 
}

