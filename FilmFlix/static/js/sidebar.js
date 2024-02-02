

const domElement = document.querySelector('.page-menu')

function formatForScreenWidth( screenWidth1090 ){
    if( screenWidth1090.matches ) activeConcealableSidebar();
    else deactiveConcealableSidebar();
}

function activeConcealableSidebar(){
    domElement.classList.add('concealable')
    if( !domElement.classList.contains('open') ) openSidebar();
    domElement.addEventListener( 'click', toggleSidebarVisibily )
}

function deactiveConcealableSidebar(){
    domElement.classList.remove('concealable')
    domElement.classList.contains('open') ? domElement.classList.remove('open') : domElement.classList.remove('closed');
    domElement.removeEventListener( 'click', toggleSidebarVisibily )
}

function toggleSidebarVisibily( e ){
    const toggleBtn = e.target.classList.contains('sidebar-toggler') ? e.target : e.target.closest('sidebar-toggler')
    if( toggleBtn.classList.contains('sidebar-close') ) closeSidebar( toggleBtn );
    else if( toggleBtn.classList.contains('sidebar-open') ) openSidebar( toggleBtn );
}

function openSidebar(){
    domElement.classList.remove('closed')
    domElement.classList.add('open')
}

function closeSidebar(){
    domElement.classList.remove('open')
    domElement.classList.add('closed')
}


export default { formatForScreenWidth }