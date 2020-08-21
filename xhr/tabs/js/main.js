const tabs = Array.from(document.querySelectorAll('.tabs a'));
//console.log(tabs);
const activeTab = document.querySelector('.tabs a.active');
const tabContent = document.getElementById('content');
const preloader = document.getElementById('preloader');

function openTab(tab) {
  const link = tab.href;
  tabs.forEach((tab) => {
    tab.classList.remove('active')
  });
  tab.classList.add('active');

  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", onLoad);
  xhr.addEventListener("error", onError);
  xhr.addEventListener("loadstart", onLoadStart);
  xhr.addEventListener("loadend", onLoadEnd);
  xhr.open("GET", link, true);
  xhr.send();
}


function clickTab(e) {
  e.preventDefault();
  const tab = e.currentTarget;
  openTab(tab);
}

function onError() {
  console.log('error');
}

function onLoadStart() {
  preloader.classList.remove('hidden');
}

function onLoadEnd() {
  preloader.classList.add('hidden');
}

function onLoad(e) {
  const xhr = e.currentTarget;

  if(xhr.status === 200) {
    content.innerHTML = xhr.responseText;
    console.log(xhr.responseText)
    console.log(xhr.status)
  }
}

function init() {
  openTab(activeTab);

  tabs.forEach(tab => {
    tab.addEventListener('click', clickTab);
  });
}

document.addEventListener('DOMContentLoaded', init);

