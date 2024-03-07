import { getTitleFromElement } from './movie.js'
import searchBM from './search.js'

export default class Filter {
    constructor( filterGroups ){
        this.rating = []
        this.genre = []
        this.yearReleased = []
        this.duration = {
            min: undefined,
            max: undefined,
            isWithinRange: ( movie ) => {
                const durationFilterRange = Array.from( { length: Number( this.duration.max || '5100' ) - ( Number( this.duration.min || '0' ) )}, ( _, i) => i + Number( this.duration.min ) + 1 )
                return durationFilterRange.includes( Number( movie.duration ) ) ? true : false;
            }
        }    

        filterGroups.forEach( ( filterGroup ) => {
            if( Filter.isDurationFilter( filterGroup ) && Filter.hasInput( filterGroup ) ) this._insertDurationFilterValues( filterGroup );
            else this._insertFilterValues( filterGroup );
        })
        
        this.isEmpty = () => {
            let threshold = 0
            for( const key of Object.keys( this ) ){
                if( key === 'isEmpty') continue;
                if( !Filter.hasValue( this[key] ) ) threshold ++;
            }
            return threshold === 4 ? true : false ;
        }
    }

    _clearFilters(){
    }

    static isDurationFilter( filterGroup ){
        return (( filterGroup.id && filterGroup.id.toLowerCase().includes('duration') ) || ( filterGroup.hasOwnProperty('min' || 'max') )) ? true : false ;
    }
    
    static hasValue( filterGroup ){
        return ( filterGroup.length >= 1 || filterGroup.min || filterGroup.max ) ? true : false ;
    }

    static hasInput( filterGroup ){
        return ( ( filterGroup.type === 'number' && filterGroup.value ) || ( filterGroup.type === 'checkbox' && filterGroup.checked ) ) ? true : false ;
    }

    static filterByTitle( searchTitle, movies ){
        if( searchTitle ){
            // SPLIT THE SEARCH TITLE INTO INDIVIDUAL WORDS IS MORE THAT ONE AND FILTER BY EACH
            // MAKE THE LIST OF THOSE ARRAYS AND MERGE THEM
            // ADDITION: ORDER BY HOW MANY OF THOSE ARRAYS THE TITLE CAME UP IN
            const filterMovieItems = movies.filter( movie => {
                return searchBM( movie.title, searchTitle )
            })
            return filterMovieItems
        }
    }

    _satisfiesFilter( movie ){
        let meetsFilters;
        for( const key of Object.keys( this ) ){
            if( key === 'isEmpty' ) continue;
            else if( Filter.isDurationFilter( this[key] ) && Filter.hasValue( this[key] ) ){ meetsFilters = this.duration.isWithinRange( movie, this[key].min, this[key].max ) ? true : false; }
            else if( Filter.hasValue( this[key] ) && !Filter.isDurationFilter( this[key] ) ) meetsFilters = this[key].includes( String( movie[key] ) ) ? true : false;
            if( meetsFilters === false ) break;
        } return meetsFilters
    }

    _insertFilterValues( filterGroup ){
        for( const key of Object.keys( filterGroup ) ){
            const filterInp = filterGroup[key]
            if( Filter.hasInput( filterInp ) ){
                const filterValuesKeyReference = filterInp.name
                this[filterValuesKeyReference].push( filterInp.value )
            }
        }
    }
    
    _insertDurationFilterValues( filterInp ){
        for( const key of Object.keys( this.duration ) ){
            if( filterInp.id.toLowerCase().includes( key ) ) this.duration[key] = filterInp.value.trim() ? filterInp.value : undefined;
        }
    }
}

export const titleFilter = Movie.filterByTitle

// CLASS FACTORY FUNCTION THAT BUILDS AN OBJECT WITH ARRAYS KEYED TO ALL FILTERABLE MOVIE PROPERTIES
export function Filterables( duration = undefined, yearReleased = undefined, rating = undefined, genre = undefined ){
    this.duration = duration || []
    this.yearReleased = yearReleased || []
    this.genre = genre || []
    this.rating = rating || []
}