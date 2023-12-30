
export default class CustomList {
    constructor( id, name, quantity ){
        this.id = id
        this.name = name
        this.quantity = quantity
    }

    constructListOptionHTML(){
        const li = document.createElement('li')
        li.classList.add('list-menu-opt', 'flex');
        li.dataset.listId = this.id
        li.innerHTML =`
            <h4 class="list-name">${this.name}</h4>
            <span class="quantity"><h4>${this.quantity}</h4></span>
        `
        return li
    }
}