

//CONSIDER CLASSIFYING THE SIDERBAR

const isWithinQueryRange = ( widthRangeStart, queries ) => {
    if( widthRangeStart == '1090' ) return ( queries.screenQuery1090.matches && !queries.screenQuery770.matches );
    else if( widthRangeStart == '770' ) return ( queries.screenQuery770.matches );
}

function formatForScreenWidth( queries ){
    const domElement = document.querySelector('.page-menu')
    if( isWithinQueryRange( '1090', queries ) ) activeConcealableSidebar('open', domElement );
    else if( isWithinQueryRange( '770', queries ) ) activeConcealableSidebar('closed', domElement );
    else deactiveConcealableSidebar( domElement );
}

function activeConcealableSidebar( lockState, domElement ){
    domElement.classList.add('concealable')
    if( lockState == 'open' ) openSidebar( domElement ); 
    else if( lockState == 'closed' ) closeSidebar( domElement );
    domElement.addEventListener( 'click', toggleSidebarVisibily )
}

function deactiveConcealableSidebar( domElement ){
    domElement.classList.remove('concealable')
    domElement.classList.contains('open') ? domElement.classList.remove('open') : domElement.classList.remove('closed');
    domElement.removeEventListener( 'click', toggleSidebarVisibily )
}

function toggleSidebarVisibily( e ){
    const toggleBtn = e.target.classList.contains('sidebar-toggler') ? e.target : e.target.closest('sidebar-toggler')
    if( toggleBtn.classList.contains('sidebar-close') ) closeSidebar( toggleBtn );
    else if( toggleBtn.classList.contains('sidebar-open') ) openSidebar( toggleBtn );
}

function openSidebar( domElement ){
    if( domElement.classList.contains('open') ) return;
    domElement.classList.remove('closed')
    domElement.classList.add('open')
}

function closeSidebar( domElement ){
    if( domElement.classList.contains('closed') ) return;
    domElement.classList.remove('open')
    domElement.classList.add('closed')
}


export default { formatForScreenWidth }