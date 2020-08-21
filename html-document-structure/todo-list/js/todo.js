const todoList = document.querySelector('.todo-list');
const done = todoList.querySelector('.done');
const undone = todoList.querySelector('.undone');
const checks = Array.from(todoList.querySelectorAll('input'));

function checked(event) {
  for(let check of checks) {
    check.addEventListener('input', event => {
      if(event.target.checked === true) {
        done.appendChild(event.target.parentElement);
      } else {
        undone.appendChild(event.target.parentElement);
      }
        })
  }
}

checks.forEach((check) => {
  check.addEventListener('click', checked)
});

