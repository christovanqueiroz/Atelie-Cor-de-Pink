const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

const addToCartButtons = document.querySelectorAll('.addToCartButtons');
let cartQty = document.querySelector('.cartQty span');

const products = document.querySelectorAll('.product')

const openLoginModal = document.querySelector('.loginPopup');
const closeLoginModal = document.querySelector('.btnCloseLoginModal');
const loginModal = document.querySelector('.loginModal');

const openSizeChartModal = document.querySelector('.sizeChartPopup');
const closeSizeChartModal = document.querySelector('.btnCloseSizeChartModal');
const sizeChartModal = document.querySelector('.sizeChartModal');

const modalFadeBackContent = document.querySelector('.fade');
const body = document.querySelector('body');

for (let i = 0; i < addToCartButtons.length; i++) {
    let button = addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
}

function addToCartClicked(event) {
    let button = event.target;
    let productItem = button.parentElement.parentElement;
    let title = productItem.getElementsByClassName('item')[0].innerText;
    let price = productItem.getElementsByClassName('price')[0].innerText;
    let imageSrc = productItem.getElementsByClassName('blur')[0].src;

    cartItems.push({
        title,
        price,
        imageSrc
    });

    localStorage.setItem("cartItems", JSON.stringify(cartItems))
}

addToCartButtons.forEach(card => {
    card.addEventListener('click', () => {
        (document.querySelector('.cartQty')).style.display = 'flex';
        cartQty.innerHTML = parseInt(cartItems.length);
    })
})

function sumFunction() {
    cartQty.innerHTML = parseInt(cartItems.length);
    if(cartItems.length)
        document.querySelector('.cartQty').style.display = 'flex';
}

sumFunction()

openLoginModal.addEventListener('click', function(){
    loginModal.classList.replace("loginModal", "loginModalVisible");
    body.style.overflow = "hidden";
    modalFadeBackContent.style.display = "flex";
    sizeChartModal.classList.replace("sizeChartModalVisible", "sizeChartModal")
})

closeLoginModal.addEventListener('click', function(){
    loginModal.classList.replace("loginModalVisible", "loginModal");
    body.style.overflow = "visible";
    modalFadeBackContent.style.display = "none";
})

openSizeChartModal.addEventListener('click', function() {
    sizeChartModal.classList.replace("sizeChartModal", "sizeChartModalVisible");
})

closeSizeChartModal.addEventListener('click', function(){
    sizeChartModal.classList.replace("sizeChartModalVisible", "sizeChartModal");
})

products.forEach(product => {
    product.addEventListener('mouseover', () => {
        (product.querySelector('.addToCartButtons')).style.visibility = 'visible';
        (product.querySelector('.blur').style.filter = 'blur(1.5px');
    })
})

products.forEach(product => {
    product.addEventListener('mouseout', () => {
        (product.querySelector('.addToCartButtons')).style.visibility = 'hidden';
        (product.querySelector('.blur')).style.filter = 'none';
    })
})

let mousePosition;
let offset = [0,0];
let isDown = false;
const divHead = document.querySelector('.sizeChartHead');

divHead.addEventListener('mousedown', function(e) {
    isDown = true;
    offset = [
        sizeChartModal.offsetLeft - e.clientX,
        sizeChartModal.offsetTop - e.clientY
    ];
}, true);

document.addEventListener('mouseup', function() {
    isDown = false;
}, true);

document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (isDown) {
        mousePosition = {
    
            x : event.clientX,
            y : event.clientY
    
        };
        sizeChartModal.style.left = (mousePosition.x + offset[0]) + 'px';
        sizeChartModal.style.top  = (mousePosition.y + offset[1]) + 'px';
    }
}, true);