import Filter from './filter.js'


export function getTaskbarDomElement(){
    const domElement = document.querySelector('.register-taskbar')
    return domElement
}

export function handleUserTask( e, register, FilterCompenent ){
    const taskComponent = e.target.closest('.taskbar-opt')
    const formatToggler = e.target.closest('.format-toggler')
    if( taskComponent.classList.contains('register-format-toggle') && !iconMatchesFormat( formatToggler, register ) ){
        register._switchFormat( formatToggler );
        register._populateRegister()
    } else if( taskComponent.classList.contains('filter-btn') ){
        FilterCompenent._toggleFilterOptions();
        toggleFilterBtnStyle( e.target, FilterCompenent.domElement )
    }
}

export function setFormatIcon( register ){
    const formatTogglerComponent = getTaskbarDomElement().querySelector('.register-format-toggle')
    const formatToggleTypeCard = formatTogglerComponent.querySelector('.card-toggle')
    const formatToggleTypelist = formatTogglerComponent.querySelector('.list-toggle')
    Array.from( formatTogglerComponent.children ).forEach( toggler => { toggler.classList.remove('active') })
    register.domElement.classList.contains('non-tabular-register') ? formatToggleTypeCard.classList.add('active') :
    register.domElement.classList.contains('tabular-register') ? formatToggleTypelist.classList.add('active') : console.log('Element "movieListContainer" format class not matched')
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

function iconMatchesFormat( formatSelection, register ){
    const iconAndRegisterAsList = register.domElement.classList.contains('non-tabular-register') && formatSelection.classList.contains('card-toggle')
    const iconAndRegisterAsCard = register.domElement.classList.contains('tabular-register') && formatSelection.classList.contains('list-toggle')
    const iconMatchesRegisterformat = ( iconAndRegisterAsCard || iconAndRegisterAsList )
    return iconMatchesRegisterformat
}
