const addToCart = document.querySelectorAll('.addToCart');
const openModal = document.querySelector('.loginPopup');
const modal = document.querySelector('.loginModal');
const body = document.querySelector('body');
const modalBackContent = document.querySelector('.fade');
const closeModal = document.querySelector('.btnCloseModal');
let cartQty = document.querySelector('.cartQty p b');

addToCart.forEach(card => {
    card.addEventListener('click', () => {
        (document.querySelector('.cartQty')).style.display = 'flex';
    })
})

function sumFunction() {
    cartQty.innerHTML = parseInt(cartQty.innerHTML) + 1
}

console.log(cartQty.innerHTML)

openModal.addEventListener('click', function(){
    modal.classList.replace("loginModal", "loginModalVisible");
    body.style.overflow = "hidden"
    modalBackContent.style.display = "flex";
})

closeModal.addEventListener('click', function(){
    modal.classList.replace("loginModalVisible", "loginModal");
    body.style.overflow = "visible"
    modalBackContent.style.display = "none"
})