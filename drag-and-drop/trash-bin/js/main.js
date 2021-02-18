'use strict';

let movedIcon;
let shiftX = 0;
let shiftY = 0;

document.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('logo')) {
    movedIcon = event.target;

    const { left, top } = event.target.getBoundingClientRect();

    shiftX = event.pageX - left - window.pageXOffset;
    shiftY = event.pageY - top - window.pageYOffset;
  }
});

document.addEventListener('mousemove', (event) => {
  if (movedIcon) {
    event.preventDefault();
    movedIcon.style.left = `${ event.pageX }px`;
    movedIcon.style.top = `${ event.pageY }px`;
    movedIcon.classList.add('moving');
    movedIcon.style.left = event.pageX - shiftX + 'px';
    movedIcon.style.top = event.pageY - shiftY + 'px';
  }
});

document.addEventListener('mouseup', (event) => {
  if (event.target.id === 'trash_bin') {
    movedIcon.style.display = 'none';
    movedIcon.classList.remove('moving')
  } else {
    movedIcon.classList.remove('moving');
    movedIcon = null;
  }
});