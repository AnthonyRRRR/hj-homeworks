const products = document.getElementsByClassName('box');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');

let finalPrice = 0;
let count = 0;

function addProduct() {
  cartCount.innerHTML = ++count;

  let priceProduct = this.getAttribute('data-price'); //лчше делать через  dataset
  console.log(priceProduct);
  finalPrice += Number(priceProduct);
  cartTotalPrice.innerHTML = getPriceFormatted(finalPrice);
}

for (let product of products) {
  product.getElementsByTagName('button')[0].addEventListener('click', addProduct)
}



