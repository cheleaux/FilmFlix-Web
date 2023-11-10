const form = document.querySelector('#insertForm')
const submitBtn = document.querySelector('.submitBtn')

const exports = { form, closeAndRedirect }
export default exports;

function closeAndRedirect( e ) {
    if (e.target != submitBtn) return;
    form.classList.add('after-add')
    submitBtn.innerHTML = 'Added Successfully <span><i class="bi bi-check"></i></span>'
}

   