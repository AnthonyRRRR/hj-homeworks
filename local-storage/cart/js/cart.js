'use strict';

let colorSwatch = document.querySelector('#colorSwatch');
console.log(colorSwatch);
const sizeSwatch = document.querySelector('#sizeSwatch');
console.log(sizeSwatch);
const addToCartForm = document.querySelector('#AddToCartForm');
const submitBtn = document.querySelector('#AddToCart');
const quickCart = document.querySelector('#quick-cart');

function getColors() {
  fetch('https://neto-api.herokuapp.com/cart/colors')
    .then((response) => {
      return response.json();
    })
    .then((colors) => {
      addColors(colors)
    });
}

// if(input.value === localStorage.getItem('color')) {
//   input.checked = true;
// } делает одно и тоже - оставляет выбранный инпут после перезагрузки стр.
//
//  ${color.type === localStorage.getItem('color') ? 'checked' : ''}

function addColors(colors) {
  colors.forEach((color) => {
    colorSwatch.innerHTML += getColorElement(color)
  });
  const colorInputs = Array.from(addToCartForm.querySelectorAll('input[name="color"]'));
  colorInputs.forEach((input) => {
    input.addEventListener('change', (event) => {
      localStorage.setItem('color', event.currentTarget.value);
    });
  })
}

function getSizes() {
  fetch('https://neto-api.herokuapp.com/cart/sizes')
    .then((response) => {
      return response.json();
    })
    .then((sizes) => {
      addSizes(sizes)
    });
};

function addSizes(sizes) {
  sizes.forEach((size) => {
    sizeSwatch.innerHTML += getSizeElement(size);

    const sizeInputs = Array.from(document.querySelectorAll('input[name="size"]'));

    sizeInputs.forEach((input) => {
      input.addEventListener('change', (event) => {
        localStorage.setItem('size', event.currentTarget.value)
      })
    })
  })
}

function getSizeElement(size) {
  return `<div 
            data-value="${ size.type }" 
            class="swatch-element plain ${ size.type } ${ size.isAvailable ? 'available' : 'soldout' }"
          >
            <input 
              id="${ size.type }" 
              type="radio" name="size" 
              value="${ size.type }" ${ size.isAvailable ? '' : 'disabled' } 
               ${ size.type === localStorage.getItem('size') ? 'checked' : '' }
            >
            <label for="${ size.type }">
              ${ size.title }
              <img 
                class="crossed-out"
                src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886"
               >  
            </label>
          </div>`
}

function getColorElement(color) {
  return `<div
            data-value="${ color.type }"
            class="swatch-element color ${ color.type } ${ color.isAvailable ? 'available' : 'soldout' }"
           >
             <div class="tooltip">${ color.title }</div>
             <input
               quickbeam="color"
               id="${ color.type }"
               type="radio"
               name="color"
               value="${ color.type }" ${ color.isAvailable ? '' : 'disabled' } 
               ${ color.type === localStorage.getItem('color') ? 'checked' : '' }
             >
             <label for="${ color.type }" style="border-color: red;">
               <span style="${ color.code }"></span>
               <img class="crossed-out"
                 src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886"
               >
             </label>
           </div>`
}

function getCartProductElement(product) {
  return `<div class="quick-cart-product quick-cart-product-static"
 id="quick-cart-product-${ product.id }" 
 style="opacity: 1;"
 >
  <div class="quick-cart-product-wrap">
    <img src="${ product.pic }" title="${ product.title }">
    <span class="s1" style="background-color: #000; opacity: .5">$${ product.price.toFixed(2) }</span>
    <span class="s2"></span>
  </div>
  <span class="count hide fadeUp"
   id="quick-cart-product-count-${ product.id }">
${ product.quantity }</span>
  <span class="quick-cart-product-remove remove" data-id="${ product.id }"></span>
</div>`
}


function getCartSnippet(products) {
  const totalSum = products.reduce((acc, product) => {
    return acc + product.price * product.quantity
  }, 0);

  return `<a id="quick-cart-pay"
            quickbeam="cart-pay"
            class="cart-ico ${ products.length === 0 ? '' : 'open' }">
  <span>
    <strong class="quick-cart-text">Оформить заказ<br></strong>
    <span id="quick-cart-price">$${ totalSum.toFixed(2) }</span>
  </span>
</a>`
}

function onSubmit(event) {
  event.preventDefault();

  const formData = new FormData(addToCartForm);
  formData.append('productId', addToCartForm.dataset.productId);

  fetch('https://neto-api.herokuapp.com/cart', {
    body: formData,
    credentials: 'same-origin',
    method: 'POST',
  })
    .then((response) => {
      if (200 <= response.status && response.status < 300) {
        return response;
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((products) => {
      updateCartState(products)
    })
}

function removeProduct(productId) {
  const formData = new FormData();
  formData.append('productId', productId);
  fetch('https://neto-api.herokuapp.com/cart/remove', {
    body: formData,
    credentials: 'same-origin',
    method: 'POST',
  })
    .then((response) => {
      if (200 <= response.status && response.status < 300) {
        return response;
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((products) => {
      updateCartState(products)
    })
}

function updateCartState(products) {
  quickCart.innerHTML = '';
  products.forEach((product) => {
    quickCart.innerHTML += getCartProductElement(product);
  });

  quickCart.innerHTML += getCartSnippet(products);
}

function init() {
  initEvents();
  getColors();
  getSizes();
}

function initEvents() {
  quickCart.addEventListener('click', (event) => {
    if (event.target.classList.contains('quick-cart-product-remove')) {
      removeProduct(event.target.dataset.id)
    }
  });

  addToCartForm.addEventListener('submit', onSubmit);
}

document.addEventListener('DOMContentLoaded', init);



