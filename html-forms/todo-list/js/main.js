const listBlock = document.getElementsByClassName('list-block')[0];
const listInput = document.getElementsByTagName('input');
let finalCount = document.getElementsByTagName('output')[0];


let count = 0;
for (let checkbox of listInput) {
  if (checkbox.checked) {
    count++;
  }
}
finalCount.value = `${ count } из ${ listInput.length }`;


function checked() {
  let count = 0;
  for (let checkbox of listInput) {
    if (checkbox.checked) {
      count++;
    }

    finalCount.value = `${ count } из ${ listInput.length }`;

    if (count !== listInput.length) {
      listBlock.classList.remove('complete');
    } else {
      listBlock.classList.add('complete');
    }
  }
}

for (let item of listInput) {
  listInput.addEventListener('click', checked);
}