const products = document.getElementsByClassName('box');
let cartCount = document.getElementById('cart-count');
let cartTotalPrice = document.getElementById('cart-total-price');
const productsArr = [];
let count = 0;


function addProduct(event) {
  let button = event.currentTarget;
  const price = Number(button.dataset.price);

  console.log(typeof price);
  const productObj = {
    price
  };

  productsArr.push(productObj);
  const fullPrice = productsArr.reduce((acc, product) => {
    return acc += product.price
  }, 0);

  cartTotalPrice.innerText = fullPrice;
  cartCount.innerText = `${productsArr.length}`;

}


document.querySelectorAll('.add').forEach((button) => {
  button.addEventListener('click', addProduct)
});




