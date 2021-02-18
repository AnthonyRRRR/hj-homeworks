'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');

// function webSocketConnect() {
//   connection.addEventListener('open', () => {
//     console.log('Вебсокет-соединение открыто');
//   });
//   connection.addEventListener('message', event => {
//     console.log(`Получено сообщение: ${ event.data }`);
//   });
//   connection.addEventListener('error', error => {
//     console.log(`Произошла ошибка: ${ error.data }`);
//   });
//   connection.addEventListener('close', event => {
//     console.log('Вебсокет-соединение закрыто');
//   });
// }

function documentClick(event) {
  connection.send(JSON.stringify({
    x: event.clientX,
    y: event.clientY
  }))
}


function init() {
  connection.addEventListener('open', () => {
    console.log('Вебсокет-соединение открыто');
  });
  connection.addEventListener('message', event => {
    console.log(`Получено сообщение: ${ event.data }`);
  });
  connection.addEventListener('error', error => {
    console.log(`Произошла ошибка: ${ error.data }`);
  });
  connection.addEventListener('close', event => {
    console.log('Вебсокет-соединение закрыто');
  });
  showBubbles(connection);
  document.addEventListener('click', documentClick);
}

document.addEventListener('DOMContentLoaded', init);

window.addEventListener('beforeunload', () => {
  connection.onclose = function () {};
  connection.close(1000)
});



