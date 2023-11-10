const searchform = document.querySelector('.search')
const icon = document.querySelector('.bi-search')
const input = document.querySelector('#search-bar')

const search = { icon, initialiseSearch }
export default search;

function initialiseSearch( e ){
    if ( !e.target ) return;
    if ( !input.classList.contains('expanded') ) { input.classList.add('expanded') }
    else searchform.submit()
}
