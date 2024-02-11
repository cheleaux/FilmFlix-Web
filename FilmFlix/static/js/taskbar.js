import CustomList from './CustomList.js'


const domElement = document.querySelector('.register-taskbar')
const formatTogglerComponent = domElement.querySelector('.register-format-toggle')

function handleUserTask( e, register ){
    const taskComponent = e.target.closest('.taskbar-opt')
    const formatToggler = e.target.closest('.format-toggler')
    if( taskComponent.classList.contains('register-format-toggle') && !iconMatchesFormat( formatToggler, register ) ) register._switchFormat( formatToggler );
    else if( taskComponent.classList.contains('register-filter') ) console.log('filter clicked');
    register._populateRegister()
}

function iconMatchesFormat( formatSelection, register ){
    const iconAndRegisterAsList = register.domElement.classList.contains('non-tabular-register') && formatSelection.classList.contains('card-toggle')
    const iconAndRegisterAsCard = register.domElement.classList.contains('tabular-register') && formatSelection.classList.contains('list-toggle')
    const iconMatchesRegisterformat = ( iconAndRegisterAsCard || iconAndRegisterAsList )
    return iconMatchesRegisterformat
}

function setFormatIcon( register ){
    const formatToggleTypeCard = formatTogglerComponent.querySelector('.card-toggle')
    const formatToggleTypelist = formatTogglerComponent.querySelector('.list-toggle')
    Array.from( formatTogglerComponent.children ).forEach( toggler => { toggler.classList.remove('active') })
    register.domElement.classList.contains('non-tabular-register') ? formatToggleTypeCard.classList.add('active') :
    register.domElement.classList.contains('tabular-register') ? formatToggleTypelist.classList.add('active') : console.log('Element "movieListContainer" format class not matched')
}

export default { domElement, handleUserTask, setFormatIcon };