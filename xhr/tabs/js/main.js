'use strict';

const tabs = Array.from(document.querySelectorAll('.tabs a'));
const tabContent = document.querySelector('#content');
const preloader = document.querySelector('#preloader');

function onTabClick(event) {
  event.preventDefault();
  openTab(event.currentTarget);
}

function openTab(tab) {
  tabs.forEach((tab) => {
    tab.classList.remove('active')
  });
  tab.classList.add('active');

  const link = tab.href;
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('loadstart', onLoadStart);
  xhr.addEventListener('load', onLoad);
  xhr.addEventListener('loadend', onLoadEnd);
  xhr.open('GET', link, true);
  xhr.send();

  function onLoad() {
    if (xhr.status === 200) {
      tabContent.innerHTML = xhr.responseText;
    }
  }
}

function onLoadStart() {
  preloader.classList.remove('hidden');
}

function onLoadEnd() {
  preloader.classList.add('hidden');
}

tabs.forEach((tab) => {
  tab.addEventListener('click', onTabClick)
});


openTab(tabs[0]);




