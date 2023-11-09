const root = document.querySelector('.search')
const icon = root.querySelector('.bi-search')
const input = root.querySelector('#search-bar')

const search = { icon, initialiseSearch }
export default search;

function initialiseSearch( e ){
    if ( !e.target ) return;
    if ( !input.classList.contains('expanded') ) { input.classList.add('expanded') }
}
