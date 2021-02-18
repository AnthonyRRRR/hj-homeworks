'use strict';

const canvas = document.querySelector('canvas');

const context = canvas.getContext('2d');
const starsColors = ['#ffffff', '#ffe9c4', '#d4fbff'];
const numColors = starsColors.length;
const numStars = Math.floor(randomNum(400, 200));
const maxRadius = 1.1;
const minRadius = 0;

function drawStars(myContext, xPos, yPos, radius, color) {
  const startAngle = Math.PI / 180 * 0;
  const endAngle = Math.PI / 180 * 360;

  canvas.style.backgroundColor = '#000';

  context.beginPath();
  context.arc(xPos, yPos, radius, startAngle, endAngle, false);
  context.fillStyle = color;
  context.globalAlpha = randomNum(1, 0.8);
  context.fill();
}

function createStars() {
  for (let n = 0; n < numStars; n++) {
    let xPos = Math.random() * canvas.width;
    let yPos = Math.random() * canvas.height;
    let radius = minRadius + (Math.random() * (maxRadius - minRadius));
    let colorIndex = Math.random() * (numColors - 1);
    colorIndex = Math.round(colorIndex);
    const color = starsColors[colorIndex];
    drawStars(context, xPos, yPos, radius, color);
  }
}

function clear() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}


function randomNum(max, min) {
  let num = Math.random() * (max - min) + min;
  num.toFixed(1);
  return num;
}

canvas.addEventListener('click', clear);
canvas.addEventListener('click', createStars);
document.addEventListener('DOMContentLoaded', createStars);

