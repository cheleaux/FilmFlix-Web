

const displayListMenu = () => {
    const listsRetrievalURL = '/api/custom-list/all'
    let listData = fetch( listsRetrievalURL )
        .then( data => data.json() )
    console.log(listData)
}

const exports = { displayListMenu }
export default exports;