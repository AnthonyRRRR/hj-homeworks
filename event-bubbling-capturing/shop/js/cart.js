'use strict';

function clickItem(event) {
  event.preventDefault();
  if(event.target.classList.contains('add-to-cart')) {
    const item = {
      title : event.target.dataset.title,
      price : event.target.dataset.price,
    };
    addToCart(item)
  }
}
document.addEventListener('click', clickItem);





