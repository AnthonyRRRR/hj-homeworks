'use strict';

function handleTableClick(event) {
  if (event.target.classList.contains('prop__name')) {
    const name = event.target.dataset.propName;
    table.dataset.sortBy = name;

    event.target.dataset.dir === '1' ? event.target.dataset.dir = '-1' : event.target.dataset.dir = '1';

    sortTable(name, event.target.dataset.dir)
  }
}


