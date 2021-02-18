'use strict';

const chatBlock = document.querySelector('.chat');
const messageForm = chatBlock.querySelector('.message-box');
const entryField = chatBlock.querySelector('.message-input');
const submitBtn = chatBlock.querySelector('.message-submit');
const messagesContent = chatBlock.querySelector('.messages-content');
let message = chatBlock.querySelector('[class="message"]');
let messageStatus = chatBlock.querySelector('.message-status');
let messageText = chatBlock.querySelector('.message-text');
let chatStatus = chatBlock.querySelector('.chat-status');
let personalMessage = chatBlock.querySelector('.message-personal');

const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');

connection.addEventListener('open', () => {
  console.log('Вебсокет-соединение открыто');
  submitBtn.disabled = false;
  chatStatus.textContent = chatStatus.dataset.online;

  const messageStatusElement = createStatusMessageElement('Пользователь появился в сети');
  messagesContent.appendChild(messageStatusElement)

});
connection.addEventListener('message', event => {
  console.log(`Получено сообщение: ${ event.data }`);
  const otherMessage = message.cloneNode(true);

  otherMessage.querySelector('.message-text').innerText = event.data;
  otherMessage.querySelector('.timestamp').innerText = formatDate(new Date());
  messagesContent.appendChild(otherMessage)

});
connection.addEventListener('error', error => {
  console.log(`Произошла ошибка: ${ error.data }`);
});
connection.addEventListener('close', event => {
  console.log('Вебсокет-соединение закрыто');
  submitBtn.disabled = true;
  chatStatus.textContent = chatStatus.dataset.offline;

  const messageStatusElement = createStatusMessageElement('Пользователь вышел из сети');
  messagesContent.appendChild(messageStatusElement)
});

function sendMessage(event) {
  event.preventDefault();
  const entryFieldValue = entryField.value;
  connection.send(entryFieldValue);

  const personalMessageClone = personalMessage.cloneNode(true);
  personalMessageClone.querySelector('.message-text').innerText = entryFieldValue;
  personalMessageClone.querySelector('.timestamp').innerText = formatDate(new Date());
  messagesContent.appendChild(personalMessageClone) // todo в отдельную фн
}

function formatDate(date) {
  return `${date.getHours()} : ${date.getMinutes()}`
}

function createStatusMessageElement(text) {
  const messageStatusClone = messageStatus.cloneNode(true);
  messageStatusClone.querySelector('.message-text').innerText = text; // todo в отдельную фн
  return messageStatusClone
}

window.addEventListener('beforeunload', () => {
  connection.onclose = function () {};
  connection.close();
});



messageForm.addEventListener('submit', sendMessage);
