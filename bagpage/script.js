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

let cep;
let url;
let data;
let address;

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
                        <input onchange="handleChangeColor(${index}, 'Branco')" class="white" type="radio" value="white" name="colors">
                        <label for="white">Branco</label>

                        <input onchange="handleChangeColor(${index}, 'Preto')" class="black" type="radio" value="black" name="colors">
                        <label for="black">Preto</label>

                        <input onchange="handleChangeColor(${index}, 'Laranja')" class="orange" type="radio" value="orange" name="colors">
                        <label for="orange">Laranja</label>

                        <input onchange="handleChangeColor(${index}, 'Rosa')" class="pink" type="radio" value="pink" name="colors">
                        <label for="pink">Rosa</label>
                    </form>
                </div>

                <div class="selectsizes">
                    <span>Tamanho</span>

                    <form class="sizes">
                        <input onchange="handleChangeSize(${index}, 'P')" class="p-size" type="radio" value="p-size" name="sizes">
                        <label for="p-size">P</label>

                        <input onchange="handleChangeSize(${index}, 'M')" class="m-size" type="radio" value="m-size" name="sizes">
                        <label for="m-size">M</label>

                        <input onchange="handleChangeSize(${index}, 'G')" class="g-size" type="radio" value="g-size" name="sizes">
                        <label for="g-size">G</label>

                        <input onchange="handleChangeSize(${index}, 'GG')" class="gg-size" type="radio"  value="gg-size" name="sizes">
                        <label for="gg-size">GG</label>
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
    const selectedItems = cartItems.map(item => `${item.title} + ${item.color} + ${item.size}`)

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    const selectedItemsText = selectedItems.join(', ')
    confirmationButton.innerHTML = `<a href="https://wa.me/5551989512183?text=Segue%20meu%20pedido:%20${selectedItemsText}" target="_blank">CONFIRMAR PEDIDO</a>`;
}

function handleChangeSize(index, size) {
    Object.assign(cartItems[index], {size})
    const selectedItems = cartItems.map(item => `${item.title} + ${item.color} + ${item.size}`)
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    const selectedItemsText = selectedItems.join(', ')
    confirmationButton.innerHTML = `<a href="https://wa.me/5551989512183?text=Segue%20meu%20pedido:%20${selectedItemsText}" target="_blank">CONFIRMAR PEDIDO</a>`;
}

const searchCep = async() => {
    cep = document.getElementById('cep').value;
    url = `https://viacep.com.br/ws/${cep}/json/`
    data = await fetch(url)
    address = await data.json()
    const selectedItems = cartItems.map(item => `${item.title} + ${item.color} + ${item.size}`)
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    const selectedItemsText = selectedItems.join(', ')
    confirmationButton.innerHTML = `<a href="https://wa.me/5551989512183?text=Segue%20meu%20pedido:%20${selectedItemsText}%20Endereço:%20${address.logradouro},%20${address.bairro},%20${address.localidade}" target="_blank">CONFIRMAR PEDIDO</a>`;
}

document.getElementById('cep').addEventListener('focusout', searchCep);

function renderProductItems() {
    bagList.innerHTML = ''
    cartItems.forEach(({title, price, imageSrc}, index) => {
        addItemToCart(title, price, imageSrc, index)
    });

    if(cartItems.length === 0) {
        document.querySelector('footer').style.position = "fixed";
        document.querySelector('footer').style.left = "0";
        document.querySelector('footer').style.bottom = "0";
        document.querySelector('.emptyBag').style.display = "flex";
        document.querySelector('.cartQty').style.display = 'none';
        confirmationButton.innerHTML = '<span>CONFIRMAR PEDIDO</span>';
        confirmationButton.addEventListener('click', function() {
            alert('Adicione as compras a sacola')
        })
    } else {
        document.querySelector('.cartQty').style.display = 'flex';
        cartQty.innerHTML = cartItems.length;

        const selectedItems = cartItems.map(item => `${item.title} + ${item.color} + ${item.size}`)

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