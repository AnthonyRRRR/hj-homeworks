'use strict';

const counter = document.querySelector('#counter');
const increment = document.querySelector('#increment');
const decrement = document.querySelector('#decrement');
const reset = document.querySelector('#reset');

function updateCounterValue() {
  counter.textContent = localStorage.counter;
}

function incrementCounterValue() {
  localStorage.counter++;

  updateCounterValue()
}

function decrementCounterValue() {
  if (localStorage.counter > 0) {
    localStorage.counter--;
  }

  updateCounterValue()
}

function resetCounterValue() {
  localStorage.counter = 0;

  updateCounterValue()
}

function init() {
  increment.addEventListener('click', incrementCounterValue);
  decrement.addEventListener('click', decrementCounterValue);
  reset.addEventListener('click', resetCounterValue);
  resetCounterValue();
}

document.addEventListener('DOMContentLoaded', init);