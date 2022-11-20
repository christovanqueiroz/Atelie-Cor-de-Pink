const addToCart = document.querySelectorAll('.addToCart');

addToCart.forEach(card => {
    card.addEventListener('click', () => {
        (document.querySelector('.cartQty')).style.display = 'flex';
    })
})