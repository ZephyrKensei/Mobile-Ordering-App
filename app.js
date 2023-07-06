import { menuArray } from './data.js';

let orderedItems = [];

document.addEventListener('click', function(e){
  if(e.target.dataset.id){
    addToCart(e.target.dataset.id)
  } else if (e.target.dataset.indexNumber) {
    removeItems(e.target.dataset.indexNumber);
  } 
});

function addToCart(menuId){
    const targetItem = menuArray.filter(function(product){
        return product.id == menuId;
    })[0];
    orderedItems.push(targetItem);
    renderOrderedItems();
    renderTotal();
};

function renderOrderedItems(){
  const getCart = orderedItems.map(function(item, index){
    return `
<div class="order" id="order">
  <div id="cart">
      <div class="checkout-items" id="checkout-items">
          <p class="name">${item.name}
          <button class="remove-btn" data-remove="remove" data-index-number="${index}">remove</button></p>
          <p class="price" data-price="price">$${item.price}</p>
      </div>
  </div>
</div>
    `
  });
  document.getElementById('cart-total').innerHTML = getCart.join("")
}

function removeItems(index){
  orderedItems.splice(index, 1)
  renderOrderedItems();
  renderTotal();
}

function renderTotal(){
  const itemPrices = orderedItems.map((item) => item.price);
  const totalPrice = itemPrices.reduce((a, b) => a + b, 0);
  document.getElementById('total-price').innerHTML = `
  <div class="price" id="total-price">
    <p class="name">Total Price:</p>
    <p class="price">$${totalPrice}</p>
  </div>
  `
}

const completeOrderBtn = document.getElementById('order-btn');
const modalCloseBtn = document.getElementById('modal-close-btn');
const orderForm = document.getElementById('order-form')
const modalPay = document.getElementById('modal-pay-btn')
const thankYou = document.getElementById('thank-you')

completeOrderBtn.addEventListener('click', () => {
  modal.style.display = 'block'
})

modalCloseBtn.addEventListener('click', () => {
  modal.style.display = 'none'
})

modalPay.addEventListener('click', function(e){
  e.preventDefault()
  const modalPayData = new FormData(orderForm)
  const firstName = modalPayData.get('fullName')
  thankYou.innerHTML = `
  <div class="thankyou-text">Thank you ${firstName}! Your order is on its way! Please refresh your homepage to return to the ordering screen.</div>
  `
  modal.style.display = 'none'
})


function getMenu(){
  let displayMenu = '';
  menuArray.forEach(function(menu){
  displayMenu += `
<div class="menu">
  <span class="emoji">${menu.emoji}</span>
  <div>
    <h3 class="name">${menu.name}</h3>
    <p class="ingredients">${menu.ingredients}</p>
    <p class="price">$${menu.price}</p>
  </div>
  <button class="add-btn" id="add-btn"
    data-id="${menu.id}">+</button>
</div>
`
  })
    return displayMenu
}

function render(){
    document.getElementById('menu-items').innerHTML = getMenu();
}
render()