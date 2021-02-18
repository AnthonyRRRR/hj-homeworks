'use strict';

const webSocketSection = document.querySelector('.websocket');
const webSocketCards = Array.from(webSocketSection.querySelectorAll('div'));
const wsConnection = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');

wsConnection.addEventListener('open', () => {
  console.log('соединение открыто')
});

wsConnection.addEventListener('message', (event) => {
  const num = Number(event.data);

  webSocketCards.forEach((card) => {
    card.classList.remove('flip-it')
  });

  webSocketCards[num-1].classList.add('flip-it')
});

wsConnection.addEventListener('close', event => {
  console.log('Соединение закрыто', event.code);
});