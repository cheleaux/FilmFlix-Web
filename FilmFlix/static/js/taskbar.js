import filter from './filter.js'


function getDomElement(){
    const domElement = document.querySelector('.register-taskbar')
    return domElement
}

function handleUserTask( e, register, filterOptionsElement ){
    const taskComponent = e.target.closest('.taskbar-opt')
    const formatToggler = e.target.closest('.format-toggler')
    if( taskComponent.classList.contains('register-format-toggle') && !iconMatchesFormat( formatToggler, register ) ) register._switchFormat( formatToggler );
    else if( taskComponent.classList.contains('filter-btn') ){
        filter.toggleFilterOptions( filterOptionsElement );
        toggleFilterBtnStyle( e.target, filterOptionsElement )
    }
    register._populateRegister()
}

function toggleFilterBtnStyle( filterBtn, filterOptionsElement ){
    if( filterOptionsElement.classList.contains('open') || filter.isActive ) styleFilterBtnActive( filterBtn )
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

function iconMatchesFormat( formatSelection, register ){
    const iconAndRegisterAsList = register.domElement.classList.contains('non-tabular-register') && formatSelection.classList.contains('card-toggle')
    const iconAndRegisterAsCard = register.domElement.classList.contains('tabular-register') && formatSelection.classList.contains('list-toggle')
    const iconMatchesRegisterformat = ( iconAndRegisterAsCard || iconAndRegisterAsList )
    return iconMatchesRegisterformat
}

function setFormatIcon( register ){
    const formatTogglerComponent = getDomElement().querySelector('.register-format-toggle')
    const formatToggleTypeCard = formatTogglerComponent.querySelector('.card-toggle')
    const formatToggleTypelist = formatTogglerComponent.querySelector('.list-toggle')
    Array.from( formatTogglerComponent.children ).forEach( toggler => { toggler.classList.remove('active') })
    register.domElement.classList.contains('non-tabular-register') ? formatToggleTypeCard.classList.add('active') :
    register.domElement.classList.contains('tabular-register') ? formatToggleTypelist.classList.add('active') : console.log('Element "movieListContainer" format class not matched')
}

export default { handleUserTask, setFormatIcon, getDomElement };