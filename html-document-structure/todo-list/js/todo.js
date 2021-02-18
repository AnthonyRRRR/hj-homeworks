const todoList = document.querySelector('.todo-list');
const done = todoList.querySelector('.done');
const undone = todoList.querySelector('.undone');
const checks = Array.from(todoList.querySelectorAll('input'));
console.log(checks);

function clickChecks(event) {
  const input = event.target;
  const label = input.parentElement;
  checks.forEach((check) => {
    if(input.checked) {
      done.appendChild(label);
    } else {
      undone.appendChild(label)
    }
  })
}

checks.forEach((check) => {
  check.addEventListener('input', clickChecks);
});