
export default class CustomList {
    constructor( id, name, quantity ){
        this.id = id
        this.name = name
        this.quantity = quantity
    }

    _constructListMrnuItemHTML(){
        const li = document.createElement('li')
        li.classList.add('list-menu-opt', 'flex');
        li.dataset.list = this.id
        li.innerHTML =`
            <h4 class="list-name">${this.name}</h4>
            <span class="quantity"><h4>${this.quantity}</h4></span>
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

    static _toggleActiveStatus( element ){
        if (element.classList.contains('list-menu-opt')){
            element.classList.toggle('tab-focus')
        }
    }
}