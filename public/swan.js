const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        const modal=document.querySelectorAll(button.dataset.modalTarget)
        // console.log(modal)
        openModal(modal)
    })
})

closeModalButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        const modal=button.closest('.modal')
        closeModal(modal)
    })
})

overlay.addEventListener('click',()=>{
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal=>{
        closeModal(modal)
    })
})

function openModal(modal){
    console.log(modal)
    if(modal==null) return;
    modal[0].classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal){
    console.log(modal);
    if(modal==null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}