const products = document.querySelectorAll('.product')

products.forEach(product => {
    product.addEventListener('mouseover', () => {
        (product.querySelector('.addToCart')).style.visibility = 'visible';
        (product.querySelector('.blur').style.filter = 'blur(1.5px');
    })
})

products.forEach(product => {
    product.addEventListener('mouseout', () => {
        (product.querySelector('.addToCart')).style.visibility = 'hidden';
        (product.querySelector('.blur').style.filter = 'none')
    })
})