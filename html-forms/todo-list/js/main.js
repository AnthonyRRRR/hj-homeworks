const listBlock = document.getElementsByClassName('list-block')[0];
const listInputs = Array.from(listBlock.getElementsByTagName('input'));
let finalCount = document.getElementsByTagName('output')[0];
const checkedInputs = listInputs.filter((input) => input.checked);


function removeCheckboxCounter() {
  listInputs[1].checked = false;
  finalCount.value = `${checkedInputs.length} из ${ listInputs.length }`;
}

function check() {
  const checkedInputs = listInputs.filter((input) => input.checked);
  finalCount.value = `${ checkedInputs.length } из ${ listInputs.length }`;

  if (checkedInputs.length === listInputs.length) {
    listBlock.classList.add('complete')
  } else {
    listBlock.classList.remove('complete')
  }
}

listInputs.forEach((input) => {
  input.addEventListener('click', check);
});
document.addEventListener('DOMContentLoaded', removeCheckboxCounter);