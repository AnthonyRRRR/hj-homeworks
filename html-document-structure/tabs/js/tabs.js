const tabsBlock = document.querySelector('#tabs');
const tabsContent = tabsBlock.querySelector('.tabs-content');
const nav = tabsBlock.querySelector('.tabs-nav');
const listArticles = Array.from(tabsContent.children);
const tabs = Array.from(nav.children);

console.log(nav);


function addTabs() {
  const demoTab = nav.querySelector('li');
  demoTab.parentElement.removeChild(demoTab);

  listArticles.forEach((article) => {
    const newTab = demoTab.cloneNode(true);
    newTab.firstElementChild.textContent = article.dataset.tabTitle;
    newTab.firstElementChild.classList.add(article.dataset.tabIcon);
    nav.appendChild(newTab);
  });
  const tabs = Array.from(nav.children);
  tabs.forEach((tab) => {
    tab.addEventListener('click', onTabClick)
  })
}

function openTab(tab) {
  const article = tabsContent.querySelector(`[data-tab-title="${ tab.firstElementChild.innerHTML }"]`);
  listArticles.forEach((article) => {
    article.classList.add('hidden')
  });
  article.classList.remove('hidden');

  tabs.forEach((tab) => {
    tab.classList.remove('ui-tabs-active')
  });
  tab.classList.add('ui-tabs-active')
}

function onTabClick(event) {
  event.preventDefault();
  openTab(event.currentTarget);
}


  openTab(nav.firstElementChild);
  tabs.forEach((tab) => {
    tab.addEventListener('click', onTabClick)
  });
  document.addEventListener('DOMContentLoaded', addTabs);

