import CustomList from './CustomList.js'


function displayListMenu() {
    const listData = fetchListData()
    const menu = document.querySelector('.list-menu')
    listData.then( data => data.forEach( item => {
        const customList = new CustomList( item.id, item.name, item.quantity )
        menu.insertAdjacentElement( 'beforeend', customList.constructListOptionHTML() )
    }))
    .catch( err => console.log(err) )
}

async function fetchListData() {
    const listsRetrievalURL = '/api/custom-list/all'
    try {
        const listData = await fetch( listsRetrievalURL).then( data => data.json() )
        return listData
    } catch (err) {
        console.log(err)
    }
}

const exports = { displayListMenu }
export default exports;