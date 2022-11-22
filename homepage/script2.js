const addToCart = document.querySelectorAll('.addToCart');

addToCart.forEach(card => {
    card.addEventListener('click', () => {
        (document.querySelector('.cartQty')).style.display = 'flex';
    })
})

const openModal = document.querySelector('.loginPopup')
const modal = document.querySelector('.loginModal')

openModal.addEventListener('click', function(){
    modal.classList.replace("loginModal", "loginModalVisible")
})