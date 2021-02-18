'use strict';

const block = document.querySelector('.block'),
  textArea = document.querySelector('.textarea'),
  message = block.querySelector('.message');

function debounce(callback, delay) {
  let timeout;

  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      callback()
    }, delay)
  }
}

textArea.addEventListener('keydown', debounce(() => {
  message.classList.add('view');
  block.classList.remove('active')
}, 2000));

textArea.addEventListener('input', () => {
  block.classList.add('active');
  message.classList.remove('view');
});

textArea.addEventListener('focus', () => {
  block.classList.add('active');
});

document.addEventListener('mousemove', (event) => {
  if (!(event.target.classList.contains('textarea'))) {
    block.classList.remove('active');
    message.classList.remove('view');
  }

  if ((event.target.classList.contains('textarea'))) {
    block.classList.add('active');
  }
});

// textArea.addEventListener('blur', () => {
//   block.classList.remove('active');
//   message.classList.remove('view');
// })


// document.addEventListener('mousemove', (event) => {
//   if ((event.target.classList.contains('textarea'))) {
//     block.classList.add('active');
//   }
// });


// const a = [];
// const result = a.push('one');
// console.log(a)
// console.log(result)


