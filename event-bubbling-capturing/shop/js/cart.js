'use strict';


function handleClick(event) {
  if (event.target.classList.contains('add-to-cart')) {
    event.preventDefault();
    const title = event.target.dataset.title;
    const price = event.target.dataset.price;
    const item = {
      title,
      price
    };
    addToCart(item);
  }
}

const itemsList = document.querySelector('.items-list');
itemsList.addEventListener('click', handleClick);

