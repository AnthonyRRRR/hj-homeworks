'use strict';

const signInForm = document.querySelector('.sign-in-htm');
const signUpForm = document.querySelector('.sign-up-htm');
const signInFormOutput = signInForm.querySelector('.error-message');
const signUpFormOutput = signUpForm.querySelector('.error-message');

function onSingInFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(signInForm);
  let user = {};
  formData.forEach((value, key) => user[key] = value);

  console.log(user);
  user = JSON.stringify(user);

  fetch('https://neto-api.herokuapp.com/signin', {
    body: user,
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    if (200 <= res.status && res.status < 300) {
      return res;
    }
    throw new Error(res.statusText);
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.error) {
        signInFormOutput.value = data.message
      } else {
        signInFormOutput.value = `Пользователь ${ data.name } успешно авторизован`
      }
    })
}


function onSingUpFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(signUpForm);
  let user = {};
  formData.forEach((value, key) => user[key] = value);
  user = JSON.stringify(user);

  fetch('https://neto-api.herokuapp.com/signup', {
    body: user,
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    if (200 <= res.status && res.status < 300) {
      return res;
    }
    throw new Error(res.statusText);
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.error) {
        signUpFormOutput.value = data.message
      } else {
        signUpFormOutput.value = `Пользователь ${ data.name } успешно зарегистрирован`
      }
    })
}


function init() {
  signInForm.addEventListener('submit', onSingInFormSubmit);
  signUpForm.addEventListener('submit', onSingUpFormSubmit);
}

document.addEventListener('DOMContentLoaded', init);


