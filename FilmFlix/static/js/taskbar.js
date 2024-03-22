import customListMenu from './customListMenu.js'

export function getTaskbarDomElement(){
    const domElement = document.querySelector('.register-taskbar')
    return domElement
}

export function handleUserTask( e, Register, Sidebar, Menus ){
    const taskComponent = e.target.closest('.taskbar-opt')
    const formatToggler = e.target.closest('.format-toggler')
    if( taskComponent.classList.contains('register-format-toggle') && !iconMatchesFormat( formatToggler, Register ) ){
        switchFormat( Register )
    }
    else if( taskComponent.classList.contains('filter-btn') ) openFilterSection( e.target, Sidebar );
    else if( taskComponent.classList.contains('delete-list-select-btn') ) customListMenu.toggleDeleteSelection( taskComponent, Menus );
}

export function setFormatIcon( Register ){
    const formatTogglerComponent = getTaskbarDomElement().querySelector('.register-format-toggle')
    const formatToggleTypeCard = formatTogglerComponent.querySelector('.card-toggle')
    const formatToggleTypelist = formatTogglerComponent.querySelector('.list-toggle')
    Array.from( formatTogglerComponent.children ).forEach( toggler => { toggler.classList.remove('active') })
    Register.domElement.classList.contains('non-tabular-register') ? formatToggleTypeCard.classList.add('active') :
    Register.domElement.classList.contains('tabular-register') ? formatToggleTypelist.classList.add('active') : console.log('Element "movieListContainer" format class not matched')
}

function toggleFilterBtnStyle( filterBtn, filterOptionsElement ){
    if( filterOptionsElement.classList.contains('open') ) styleFilterBtnActive( filterBtn )
    else if( filterOptionsElement.classList.contains('closed') ) styleFilterBtnInactive( filterBtn );
}

function styleFilterBtnActive( filterBtn ){
    filterBtn.classList.remove('inactive')
    filterBtn.classList.add('active');
}

function styleFilterBtnInactive( filterBtn ){
    filterBtn.classList.remove('active')
    filterBtn.classList.add('inactive')
}

function iconMatchesFormat( formatSelection, Register ){
    const iconAndRegisterAsList = Register.domElement.classList.contains('non-tabular-register') && formatSelection.classList.contains('card-toggle')
    const iconAndRegisterAsCard = Register.domElement.classList.contains('tabular-register') && formatSelection.classList.contains('list-toggle')
    const iconMatchesRegisterformat = ( iconAndRegisterAsCard || iconAndRegisterAsList )
    return iconMatchesRegisterformat
}

function switchFormat( Register ){
    Register._switchFormat( formatToggler );
    Register._populateRegister()
}
function openFilterSection( filterBtn, Sidebar ){
    Sidebar.filterComponent._toggleFilterOptions();
    toggleFilterBtnStyle( filterBtn, Sidebar.filterComponent.domElement )
}