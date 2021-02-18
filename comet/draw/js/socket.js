'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/draw');

connection.addEventListener('open', () => {
  console.log('соединение открыто')
});
connection.addEventListener('message', (event) => {
  console.log(event.data)
});
connection.addEventListener('close', event => {
  console.log(event.code);
});

window.editor.addEventListener('update', () => {
  canvas.toBlob(blob => connection.send(blob))
});