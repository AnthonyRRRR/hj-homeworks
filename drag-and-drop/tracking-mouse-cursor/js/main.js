'use strict';

const cat = document.querySelector('.cat'),
  leftEyeBound = cat.querySelector('.cat_position_for_left_eye'),
  rightEyeBound = cat.querySelector('.cat_position_for_right_eye'),
  leftEye = cat.querySelector('.cat_eye_left'),
  rightEye = cat.querySelector('.cat_eye_right');

function moveEyes(eyeBound, eye, x, y) {
  const bounds = eyeBound.getBoundingClientRect();

  if (x > bounds.right) {
    eye.style.left = bounds.width / 2 + 'px'
  } else if (x < bounds.left) {
    eye.style.left = 0 + 'px'
  }

  if (y > bounds.top) {
    eye.style.top = bounds.height / 2 + 'px'
  } else if (y < bounds.bottom) {
    eye.style.top = 0 + 'px'
  }
}

function init(event) {
  moveEyes(leftEyeBound, leftEye, event.pageX, event.pageY);
  moveEyes(rightEyeBound, rightEye, event.pageX, event.pageY);
}

document.addEventListener('mousemove', (event) => {
  init(event)
});
