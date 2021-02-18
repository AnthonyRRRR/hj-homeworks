'use strict';

let counter = document.querySelector('.counter');
let output = document.querySelector('output.errors');
let connection = new WebSocket('wss://neto-api.herokuapp.com/counter');

function webSocketConnect() {
  connection.addEventListener('open', () => {
    console.log('Вебсокет-соединение открыто');
  });
  connection.addEventListener('message', event => {
    console.log(`Получено сообщение: ${ event.data }`);
    let dataObj = JSON.parse(event.data);
    console.log(dataObj);
    counter.textContent = dataObj.connections;
    output.textContent = dataObj.errors;
  });
  connection.addEventListener('error', error => {
    console.log(`Произошла ошибка: ${ error.data }`);
  });
  connection.addEventListener('close', event => {
    console.log('Вебсокет-соединение закрыто');
  });
}

window.addEventListener('beforeunload', () => {
  connection.onclose = function () {};
  connection.close(1000)
});


document.addEventListener('DOMContentLoaded', webSocketConnect);
