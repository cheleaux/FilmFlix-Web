
export default class Filter {
    constructor( filterGroups ){
        this.rating = []
        this.genre = []
        this.yearReleased = []
        this.duration = {
            min: 0,
            max: undefined,
            isWithinRange: ( movie ) => {
                const durationFilterRange = Array.from( { length: Number( this.duration.max || '5100' ) - ( Number( this.duration.min || 0 ) )}, ( _, i) => i + Number( this.duration.min ) + 1 )
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
            let filteredMovieItems = []
            searchTitle.toLowerCase().split(' ').forEach( word => {
                // MAKE CLONE OF THE MOVIES ARRAY ITERATE OVER
                const moviesClone = JSON.parse( JSON.stringify( movies ) )
                moviesClone.forEach( movie => {
                    const indexOfWord = searchTitle.toLowerCase().split(' ').indexOf(word)
                    fetchRelevantMovies( movie, word, indexOfWord, filteredMovieItems )
                })
            })
            // SORT IN ORDER OF DESCENDING RELEVANCE
            filteredMovieItems.sort( ( movieA, movieB ) => movieB.points - movieA.points )
            return filteredMovieItems
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

const fetchRelevantMovies = ( movie, word, indexOfWord, filteredMovieItems ) => {
    // DETERMINE IF MOVIE WAS ALREADY PROCESSED PREVIOUSLY
    const processedMovieInstance = filteredMovieItems.find( processedMovie => processedMovie.title === movie.title )
    if( processedMovieInstance ) movie = processedMovieInstance
    
    // CALCULATE RELEVANCE TO AND PUSH ACCORDINGLY
    allocateTitleRelevancePoints( movie, word, indexOfWord )
    if( movie.points > 0 && !processedMovieInstance ) filteredMovieItems.push( movie )
}

const allocateTitleRelevancePoints = ( movie, word, indexOfSearchWord ) => {
    movie.points = movie.points || 0;
    if( movie.title.toLowerCase().includes( word ) ){
        movie.points += 2;
        const indexOfTitleWord = movie.title.toLowerCase().split(' ').indexOf( word )
        if( indexOfSearchWord === indexOfTitleWord && movie.title.charAt(0).toLowerCase() !== word.charAt(0)) movie.points += 1;
    }
    if( movie.title.charAt(0).toLowerCase() === word.charAt(0) ) movie.points += 1;
}

export const filterRegisterByTitle = Filter.filterByTitle

// CLASS FACTORY FUNCTION THAT BUILDS AN OBJECT WITH ARRAYS KEYED TO ALL FILTERABLE MOVIE PROPERTIES
export function Filterables( duration = undefined, yearReleased = undefined, rating = undefined, genre = undefined ){
    this.duration = duration || []
    this.yearReleased = yearReleased || []
    this.genre = genre || []
    this.rating = rating || []
}