'use strict';

let xhr = new XMLHttpRequest();
xhr.addEventListener('load', onLoad);
xhr.open('GET', 'https://neto-api.herokuapp.com/book/', true);
xhr.send();

function onLoad() {
  const data = JSON.parse(xhr.responseText);
  const booksList = document.querySelector('#content');
    booksList.innerHTML = '';
  data.forEach((book) => {
    booksList.innerHTML += `<li
                                data-title = "${ book.title }"
                                data-author = "${ book.author.name }"
                                data-info = "${ book.info }"
                                data-price = "${ book.price }">
                            <img src="${book.cover.small}">
                            </li>`
  })
}


function init() {
  document.querySelectorAll('li').forEach((book) => {
    book.addEventListener('click', onLoad)
  });
}

document.addEventListener('DOMContentLoaded', init);

