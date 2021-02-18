'use strict';

const pupil = document.querySelector('.big-book__pupil');

document.addEventListener('mousemove', (event) => {
  const { x, y, width, height } = pupil.getBoundingClientRect();

  const eyeCenterX = x + 0.5 * width;
  const eyeCenterY = y + 0.5 * height;

  const mouseX = event.clientX,
    mouseY = event.clientY;

  const distanceX = Math.abs(mouseX - eyeCenterX);
  const distanceY = Math.abs(mouseY - eyeCenterY);
  const distance = (distanceX ** 2 + distanceY ** 2) ** 0.5;

  let maxDistance;
  let pupilSize;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const EYE_OFFSET = 30;

  pupil.style.setProperty('--pupil-x', `${ ((mouseX - eyeCenterX) / eyeCenterX) * EYE_OFFSET }px`)
  pupil.style.setProperty('--pupil-y', `${ ((mouseY - eyeCenterY) / eyeCenterY) * EYE_OFFSET }px`)



  if (mouseX < eyeCenterX && mouseY < eyeCenterY) {
    maxDistance = (eyeCenterX ** 2 + eyeCenterY ** 2) ** 0.5;
    pupilSize = distance / maxDistance * -2 + 3;

  }

  if (mouseX > eyeCenterX && mouseY < eyeCenterY) {
    maxDistance = ((windowWidth - eyeCenterX) ** 2 + eyeCenterY ** 2) ** 0.5;
    pupilSize = distance / maxDistance * -2 + 3;
  }

  if (mouseX > eyeCenterX && mouseY > eyeCenterY) {
    maxDistance = ((windowWidth - eyeCenterX) ** 2 + (windowHeight - eyeCenterY) ** 2) ** 0.5;
    pupilSize = distance / maxDistance * -2 + 3;
  }

  if (mouseX < eyeCenterX && mouseY > eyeCenterY) {
    maxDistance = ((eyeCenterX) ** 2 + (windowHeight - eyeCenterY) ** 2) ** 0.5;
    pupilSize = distance / maxDistance * -2 + 3;
  }

  pupil.style.setProperty('--pupil-size', `${ pupilSize }`)
});