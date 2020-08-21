'use strict';

function handleTableClick(event) {
  const name = event.target.dataset.propName;

  if(event.target.tagName.toLowerCase() === 'th') {
    if(event.target.dataset.dir === '1') {
      event.target.dataset.dir = '-1'
    } else {
      event.target.dataset.dir = '1'
    }
  }
  document.querySelector('table').dataset.sortBy = name;
  sortTable(name,event.target.dataset.dir);
}


