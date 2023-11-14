const searchform = document.querySelector('.search')
const icon = document.querySelector('.bi-search')
const input = document.querySelector('#search-bar')
const logo = document.querySelector('#logo-link')
const nav = document.querySelector('nav')
const query600 = window.matchMedia('(max-width: 600px)')

const search = { icon, initialiseSearch }
export default search;

formatNav()

query600.addEventListener( 'change', formatNav )

function formatNav(){
    if ( query600.matches && !nav.classList.contains('mobile-nav') ) {
        nav.classList.remove('desktop-nav')
        nav.classList.add('mobile-nav')
    }
    else if ( !query600.matches && !nav.classList.contains('desktop-nav') ) {
        nav.classList.remove('mobile-nav')
        nav.classList.add('desktop-nav')
    }
}

function initialiseSearch( e ){
    if ( !e.target ) return;
    if ( !input.classList.contains('expanded') ) toggleSearchBar();
    else if ( !input.value && input.classList.contains('expanded') ) toggleSearchBar();
    else searchform.submit()
}

function toggleSearchBar(){
    input.classList.toggle('expanded')
    if ( query600.matches && input.classList.contains('expanded') ) nav.classList.add('search-active');
    else if ( query600.matches && !input.classList.contains('expanded') ) nav.classList.remove('search-active');
}