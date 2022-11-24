const addToCart = document.querySelectorAll('.addToCart');

addToCart.forEach(card => {
    card.addEventListener('click', () => {
        (document.querySelector('.cartQty')).style.display = 'flex';
    })
})

const openModal = document.querySelector('.loginPopup')
const modal = document.querySelector('.loginModal')
const body = document.querySelector('body')
const modalBackContent = document.querySelector('.fade');

openModal.addEventListener('click', function(){
    modal.classList.replace("loginModal", "loginModalVisible");
    body.style.overflow = "hidden"
    modalBackContent.style.display = 'flex';
})

const closeModal = document.querySelector('.btnCloseModal')

closeModal.addEventListener('click', function(){
    modal.classList.replace("loginModalVisible", "loginModal")
})