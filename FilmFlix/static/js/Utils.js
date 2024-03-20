import { Filterables } from './filter.js'

export const sortArguments = ( args, func ) => {
    switch( func ){
        case '_populateRegister':
            const definedMovieList = Object.values( args ).find( arg => Array.isArray( arg ) ) || null
            const attributes = Object.values( args ).find( arg => typeof arg === 'object' && !Array.isArray( arg ) ) || null
            const filterActive = attributes && attributes.hasOwnProperty('filterActive') ? attributes['filterActive'] : null;
            const rootFetch = attributes && attributes.hasOwnProperty('rootFetch') ? attributes['rootFetch'] : null;
            var sortedArgs = { definedMovieList, filterActive, rootFetch }
            break;
        case '':

        default: 
            var sortedArgs = args
    }
    return sortedArgs
}

export const extractUniqueValues = ( movieList ) => {
    const uniqueValues = new Filterables()
    movieList.forEach( movie => {
        for( const key of Object.keys( uniqueValues )){
            if( !uniqueValues[key].includes( movie[key] ) ) uniqueValues[key].push( movie[key] );
        }
    })
    return uniqueValues
}