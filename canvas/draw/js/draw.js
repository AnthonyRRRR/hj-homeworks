'use strict';

const canvas = document.querySelector('#draw');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const curves = [];

let tickCount = 0,
  hue = 0,
  lineWidth = 100,
  brushRadiusInc = true,
  needsRepaint = false,
  painting = false;

canvas.addEventListener('mousedown', function (event) {
  painting = true;

  ++tickCount;
  if (!(tickCount % 10)) {
    setLineWidth();
    setHue();
  }

  const curve = [];
  const posX = event.clientX,
    posY = event.clientY;

  curve.push(new Point(posX, posY, hue, lineWidth));
  curves.push(curve)
  needsRepaint = true;
});

canvas.addEventListener('mouseup', function () {
  painting = false;
  context.beginPath();
});


canvas.addEventListener('mousemove', function (event) {
  if (painting) {
    let posX = event.clientX,
      posY = event.clientY;

    ++tickCount;
    if (!(tickCount % 10)) {
      setLineWidth();
      setHue();
    }

    curves[curves.length - 1].push(new Point(posX, posY, hue, lineWidth));
    needsRepaint = true;
    // console.log(curves)
  }
});

function setHue() {
  if (hue !== 356) {
    hue++
  } else {
    hue = 0;
  }
}

function setLineWidth() {
  if (brushRadiusInc) {
    lineWidth++;
    if (lineWidth >= 100) {
      brushRadiusInc = false
    }
  }

  if (!brushRadiusInc) {
    lineWidth--;
    if (lineWidth <= 0) {
      brushRadiusInc = true
    }
  }
}

function Point(x, y, hue, lineWidth) {
  this.x = x;
  this.y = y;
  this.hue = hue;
  this.lineWidth = lineWidth
}

// function smoothCurve(points) {
//   context.beginPath();
//   // context.lineWidth = brushRadius;
//   context.lineJoin = 'round';
//   context.lineCap = 'round';
//
//
//   context.moveTo(points[0].x, points[0].y);
// // context.stroke();
//   console.log(points);
//
//   for (let i = 1; i < points.length - 1; i++) {
//
//     console.log(points[i]);
//     smoothCurveBetween(points[i], points[i + 1]);
//   }
//
//
// }

function smoothCurve(points) {
  for(let i = 1; i < points.length - 1; i++) {
    const pointFrom = points[i],
      pointTo = points[i + 1];

    context.beginPath();
    context.lineWidth = pointFrom.lineWidth;
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.strokeStyle = `hsl(${pointFrom.hue},100%,50%)`;
    context.lineTo(pointFrom.x, pointFrom.y);
    context.stroke();

    context.lineWidth = pointTo.lineWidth;
    context.lineTo(pointTo.x,pointTo.y);
    context.stroke();
    context.closePath();
  }
}

function smoothCurveBetween(p1, p2) {
  //
  // {X: 23,y: 57}
  // {x: 24, y: 78}

  // [23, 57], [24, 78]

  // Bezier control point

  const cp = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2}
  // .map((cord, idx) => (cord + p2[idx]) / 2);

  // const cord = 23;
  // x = (23 + (24 / 2)


  // context.beginPath();
  // context.moveTo(p1.x, p1.y);

  console.log(`hsl(${p2.hue},100%,50%)`);

  context.fillStyle = `hsl(${p2.hue},100%,50%)`;
  context.lineWidth = p2.lineWidth;
  context.quadraticCurveTo(p1.x, p1.y, cp.x, cp.y);
  context.stroke();
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function repaint() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  curves.forEach((curve) => {
    const point = curve[0];
    context.beginPath();
    context.arc(point.x, point.y, point.lineWidth / 2, 0, Math.PI * 2);
    context.fillStyle = point.hue;
    context.fill();

    smoothCurve(curve)
  })
}

function tick() {
  // console.log(123);
  if (needsRepaint) {
    repaint();
    needsRepaint = false;
  }

  // console.log(tick);

  window.requestAnimationFrame(tick);
}

tick();

canvas.addEventListener('dblclick', clearCanvas);





