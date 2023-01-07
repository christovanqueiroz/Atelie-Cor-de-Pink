const openLoginModal = document.querySelector('.loginPopup');
const closeLoginModal = document.querySelector('.btnCloseLoginModal');
const loginModal = document.querySelector('.loginModal');

const openSizeChartModal = document.querySelector('.sizeChartPopup');
const closeSizeChartModal = document.querySelector('.btnCloseSizeChartModal');
const sizeChartModal = document.querySelector('.sizeChartModal');

const modalFadeBackContent = document.querySelector('.fade');
const body = document.querySelector('body');

let title = localStorage.getItem("title");
let price = localStorage.getItem("price");
let imageSrc = localStorage.getItem("imageSrc");
console.log(title, price, imageSrc)

function addItemToCart(title, price, imageSrc) {
    let cartRow = document.createElement('div');
    cartRow.classList.add('cartItem')
    let cartItems = document.getElementsByClassName('bag')[0]
    let cartRowContents = `
            <img src="${imageSrc}" style="width: 144px; height: 144px;" alt="">

            <div class="info">
                <div class="title">
                    <span>${title}</span>
                </div>

                <div class="price">
                    <span><b>${price}</b></span>
                </div>

                <div class="selectcolor">
                    <span>Selecione a cor</span>

                    <form class="colors">
                        <div class="white">
                            <input type="radio" id="white" value="white" name="colors">
                            <label for="white">Branco</label>
                        </div>

                        <div class="black">
                            <input type="radio" id="black" value="black" name="colors">
                            <label for="black">Preto</label>
                        </div>

                        <div class="orange">
                            <input type="radio" id="orange" value="orange" name="colors">
                            <label for="orange">Laranja</label>
                        </div>


                        <div class="pink">
                            <input type="radio" id="pink" value="pink" name="colors">
                            <label for="pink">Rosa</label>
                        </div>
                    </form>
                </div>

                <div class="selectsizes">
                    <span>Tamanho</span>

                    <form class="sizes">
                        <div>
                            <input type="radio" id="p" value="p" name="sizes">
                            <label for="p">P</label>
                        </div>

                        <div>
                            <input type="radio" id="m" value="m" name="sizes">
                            <label for="m">M</label>
                        </div>

                        <div>
                            <input type="radio" id="g" value="g" name="sizes">
                            <label for="g">G</label>
                        </div>

                        <div>
                            <input type="radio" id="gg" value="gg" name="sizes">
                            <label for="gg">GG</label>
                        </div>
                    </form>
                </div>

                <div class="remove">
                    <img src="./assets/main/Trash.svg" alt="">
                    <span>Remover</span>
                </div>
            </div>`

    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    document.querySelector('.emptyBag').style.display = "none";
}

addItemToCart(title, price, imageSrc)

let removeCartItemButtons = document.getElementsByClassName('remove')

for (let i = 0; i < removeCartItemButtons.length; i++) {
    let button = removeCartItemButtons[i]
    button.addEventListener('click', function(event) {
        let buttonClicked = event.target
        buttonClicked.parentElement.parentElement.parentElement.remove()
        localStorage.clear()
        document.querySelector('.emptyBag').style.display = "flex";
    })
}

const colorButtons = document.querySelectorAll(".colors button");
const colorText = document.querySelectorAll('.colors span');

for (let i = 0; i < colorButtons.length; i++) {
    colorButtons[i].addEventListener('click', function() {
        colorText[i].style.color = "#EC4899";
        colorText[i].style.textDecoration = "underline"
        colorButtons[i].style.border = "2px solid #EC4899"
    });
}

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