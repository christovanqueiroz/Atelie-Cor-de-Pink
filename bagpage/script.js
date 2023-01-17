const openLoginModal = document.querySelector('.loginPopup');
const closeLoginModal = document.querySelector('.btnCloseLoginModal');
const loginModal = document.querySelector('.loginModal');

let bagList = document.getElementById('bagList')

let cartQty = document.querySelector('.cartQty span');

const openSizeChartModal = document.querySelector('.sizeChartPopup');
const closeSizeChartModal = document.querySelector('.btnCloseSizeChartModal');
const sizeChartModal = document.querySelector('.sizeChartModal');

const modalFadeBackContent = document.querySelector('.fade');
const body = document.querySelector('body');

const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

const confirmationButton = document.querySelector('.confirmation')

function addItemToCart(title, price, imageSrc, index) {
    let cartRow = document.createElement('div');
    cartRow.classList.add('cartItem')
    let cartRowContents = `
            <img src="${imageSrc}" alt="">

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
                        <input onchange="handleChangeColor(${index}, 'branco')" class="white" type="radio" value="branco" name="colors">
                        <label for="branco">Branco</label>

                        <input onchange="handleChangeColor(${index}, 'preto')" class="black" type="radio" value="preto" name="colors">
                        <label for="preto">Preto</label>

                        <input onchange="handleChangeColor(${index}, 'laranja')" class="orange" type="radio" value="laranja" name="colors">
                        <label for="laranja">Laranja</label>

                        <input onchange="handleChangeColor(${index}, 'rosa')" class="pink" type="radio" value="rosa" name="colors">
                        <label for="rosa">Rosa</label>

                    </form>
                </div>

                <div class="selectsizes">
                    <span>Tamanho</span>

                    <form class="sizes">
                        <input class="p-size" type="radio" value="p" name="sizes">
                        <label for="p">P</label>

                        <input class="m-size" type="radio" value="m" name="sizes">
                        <label for="m">M</label>

                        <input class="g-size" type="radio" value="g" name="sizes">
                        <label for="g">G</label>

                        <input class="gg-size" type="radio"  value="gg" name="sizes">
                        <label for="gg">GG</label>
                    </form>
                </div>

                <div class="remove" onclick="removeItem(${index})">
                    <img src="./assets/main/Trash.svg" alt="">
                    <span>Remover</span>
                </div>
            </div>`

    cartRow.innerHTML = cartRowContents
    bagList.append(cartRow)
    document.querySelector('.emptyBag').style.display = "none";
}

function handleChangeColor(index, color) {
    Object.assign(cartItems[index], {color})
    console.log(cartItems)
    renderProductItems()
}

function renderProductItems() {
    bagList.innerHTML = ''
    cartItems.forEach(({title, price, imageSrc}, index) => {
        addItemToCart(title, price, imageSrc, index)
    });

   
    if(cartItems.length === 0) {
        document.querySelector('.emptyBag').style.display = "flex";
        document.querySelector('.cartQty').style.display = 'none';
        confirmationButton.innerHTML = '<span>CONFIRMAR PEDIDO</span>';
        confirmationButton.addEventListener('click', function() {
            alert('Adicione as compras a sacola')
        })
    } else { 
        document.querySelector('.cartQty').style.display = 'flex';
        cartQty.innerHTML = cartItems.length;

        const selectedItems = cartItems.map(item => `${item.title} + ${item.color}`)
        const selectedItemsText = selectedItems.join(', ')

        confirmationButton.innerHTML = `<a href="https://wa.me/5551989512183?text=Segue%20meu%20pedido:%20${selectedItemsText}" target="_blank">CONFIRMAR PEDIDO</a>`;
    }
}

function removeItem(index) {
    cartItems.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    cartQty.innerHTML = parseInt(cartItems.length)
    renderProductItems()
}

renderProductItems()

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