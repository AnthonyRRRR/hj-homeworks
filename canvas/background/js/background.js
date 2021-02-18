'use strict';

const canvas = document.querySelector('#wall'),
  context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const crosses = [];
const circles = [];

const MIN_OBJ_COUNT = 50,
  MAX_OBJ_COUNT = 200,
  FPS = 20;

const TOTAL_NUM_OF_OBJ = randomNumInt(MIN_OBJ_COUNT, MAX_OBJ_COUNT),
  TYPE_NUM_OF_OBJ = TOTAL_NUM_OF_OBJ / 2;

function drawCircle(circle) {
  const startAngle = Math.PI / 180 * 0;
  const endAngle = Math.PI / 180 * 360;

  context.beginPath();
  context.lineWidth = circle.strokeWidth;
  context.strokeStyle = '#FFF';
  context.fillStyle = 'transparent';
  const { x, y } = circle.timeFunction(circle.x, circle.y, new Date());
  context.arc(x, y, circle.radius, startAngle, endAngle, true);
  context.stroke();
}

function drawCross(cross) {
  context.beginPath();
  context.lineWidth = cross.strokeWidth;
  context.strokeStyle = '#FFF';
  context.fillStyle = 'transparent';
  const { x, y } = cross.timeFunction(cross.x, cross.y, new Date());
  const crossSize = cross.crossSize;


  context.beginPath();
  context.strokeStyle = '#FFF';
  context.fillStyle = 'transparent';
  context.save();
  context.translate(x, y);
  context.rotate(cross.deg * Math.PI / 180);
  context.moveTo(-1 / 2 * crossSize, 0);
  context.lineTo(1 / 2 * crossSize, 0);
  context.closePath();
  context.stroke();
  context.beginPath();
  context.moveTo(0, -1 / 2 * crossSize);
  context.lineTo(0, 1 / 2 * crossSize);
  context.closePath();
  context.stroke();
  context.restore();
  cross.deg = cross.deg + cross.speed;
}


function renderObjects() {
  circles.forEach((circle) => {
    drawCircle(circle)
  });

  crosses.forEach((cross) => {
    drawCross(cross)
  })
}

function randomNumInt(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomNum(min, max) {
  return Math.random() * (max - min) + min;
}

function createTimeFunction() {
  const timeFunctionsArr = [
    function timeFunc1(x, y, time) {
      return {
        x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
        y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
      };
    },
    function timeFunc2(x, y, time) {
      return {
        x: x + Math.sin((x + (time / 10)) / 100) * 5,
        y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
      }
    }
  ];

  const randomIndex = randomNumInt(0, timeFunctionsArr.length - 1);
  return timeFunctionsArr[randomIndex];
}

function getSize() {
  return randomNum(0.1, 0.6)
}

function Circle() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;
  this.timeFunction = createTimeFunction();
  this.size = getSize();
  this.radius = 12 * this.size;
  this.strokeWidth = 5 * this.size;
}

function Cross() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;
  this.timeFunction = createTimeFunction();
  this.size = getSize();
  this.strokeWidth = 5 * this.size;
  this.crossSize = 20 * this.size;
  this.speed = randomNum(-0.2, 0.2);
  this.deg = randomNum(0, 360);
}

function init() {
  for (let n = 0; n < TYPE_NUM_OF_OBJ; n++) {
    circles.push(new Circle());
  }

  for (let i = 0; i < TYPE_NUM_OF_OBJ; i++) {
    crosses.push(new Cross())
  }

  renderObjects();
  setInterval(() => {

    context.clearRect(0, 0, canvas.width, canvas.height);
    renderObjects();
  }, 1000 / FPS);
}

document.addEventListener('DOMContentLoaded', init);