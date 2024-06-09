
export default class CustomList {
    constructor( name, quantity, movieIDs, id = null ){
        this.id = id
        this.name = name
        this.quantity = quantity
        this.movieIDs = movieIDs
    }

    _constructListMenuItemHTML(){
        const li = document.createElement('li')
        li.classList.add('list-menu-opt', 'flex');
        li.dataset.list = this.id
        li.innerHTML =`
            <h4 class="list-name">${this.name}</h4>
            <div class="list-menu-opt-subcontainer flex">
                <span class="quantity"><h4>${this.quantity}</h4></span>
                <i class="bi bi-trash3-fill del-list-btn"></i>
            </div>
        `
        return li
    }
    
    static async fetchCustomListMovies( ID ){
        const url = `/api/custom-list?list=${ ID }`
        const listMoviesData = await fetch(url)
        .then( res => res.json() )
        .catch( err => console.log( err ))
        return listMoviesData
    }

    static async fetchMetaData(){
        const listsRetrievalURL = '/api/custom-list/all'
        try {
            const listData = await fetch( listsRetrievalURL ).then( data => data.json() )
            return listData
        } catch (err) {
            console.log(err)
        }
    }

    static async add( collectionData ){
        try {
            fetch('/custom-lists/add-list', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify( collectionData ) // Convert the data to JSON format
            }).then( res => console.log( res ) )
        } catch ( err ){
            throw new Error(`POST Request Error: ${ err }`)
        }
    }

    static async delete( list ){
        try {
            const ID = list.id
            const res = fetch(`/api/custom-list?list=${ ID }`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
            })
            return res
        } catch ( err ){
            throw new Error(`DELETE Request Error: ${ err }`)
        }
    }

    static _toggleActiveStatus( element ){
        if ( element.classList.contains('list-menu-opt') ){
            element.classList.toggle('tab-focus')
        }
    }
}