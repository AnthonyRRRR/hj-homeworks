'use strict';

let from = document.getElementById('from');
let to = document.getElementById('to');
const result = document.getElementById('result');
const source = document.getElementById('source');
const content = document.getElementById('content');
const loader = document.getElementById('loader');

const xhr = new XMLHttpRequest();
xhr.addEventListener('loadstart', onLoadStart);
xhr.addEventListener('load', onLoad);
xhr.addEventListener('loadend', onLoadEnd);
xhr.open('GET', 'https://neto-api.herokuapp.com/currency', true);
xhr.send();

function onLoadStart() {
  loader.classList.remove('hidden')
}

function onLoad() {
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    console.log(data);
    data.forEach((currency) => {
      from.innerHTML += `<option value="${ currency.value }">${ currency.code } </option>`;
      to.innerHTML += `<option value="${ currency.value }">${ currency.code }</option>`;
    });
  }
}

function onLoadEnd() {
  loader.classList.add('hidden');
  content.classList.remove('hidden');
}

function getCurrencyRate() {
  let num = (from.value / to.value) * source.value;
  return result.value = num.toFixed(2);
}

document.addEventListener('input', getCurrencyRate);

