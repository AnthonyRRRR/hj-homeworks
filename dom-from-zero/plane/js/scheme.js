'use strict';

const acSelect = document.querySelector('#acSelect'),
  btnSeatMap = document.querySelector('#btnSeatMap'),
  btnSetFull = document.querySelector('#btnSetFull'),
  btnSetEmpty = document.querySelector('#btnSetEmpty'),
  seatMapTitle = document.querySelector('#seatMapTitle'),
  seatMapDiv = document.querySelector('#seatMapDiv'),
  totalPax = document.querySelector('#totalPax'),
  totalAdult = document.querySelector('#totalAdult'),
  totalHalf = document.querySelector('#totalHalf');

let seats;


function loadPlaneInfo(event) {
  event.preventDefault();
  const planeId = acSelect.value;
  fetch(`https://neto-api.herokuapp.com/plane/${ planeId }`)
    .then(res => res.json())
    .then((schemeData) => {
      showScheme(schemeData)
    });
}

function el(tagName, attributes, children) {
  const element = document.createElement(tagName);
  if (typeof attributes === 'object') {
    Object.keys(attributes).forEach(i => element.setAttribute(i, attributes[i]));
  }
  if (typeof children === 'string') {
    element.textContent = children;
  } else if (children instanceof Array) {
    children.forEach(child => element.appendChild(child));
  }
  return element;
}

function createSchemeNode(seatsNumber, rowNumber, scheme) {
  const allSeatsArr = ['A', 'B', 'C', 'D', 'E', 'F'];
  let currentSeatIndex = 0;
  const startSeatsArr = new Array(3).fill(0);

  const generateSeat = (seatIndex, allSeatsArr, seatsNumber, scheme) => {
    const letters = scheme['letters' + seatsNumber];
    const seat = allSeatsArr[seatIndex];
    const isRendered = seatsNumber === 0 ? false : letters.includes(seat);
    const children = isRendered ? [el('span', { class: 'seat-label' }, seat)] : ' ';
    const className = isRendered ? 'seat' : 'no-seat';
    currentSeatIndex++;

    return el('div', { class: `col-xs-4 ${ className }` }, children)
  };

  return el('div', { class: 'row seating-row text-center' }, [
    el('div', { class: 'col-xs-1 row-number' }, [
      el('h2', { class: '' }, rowNumber + 1)
    ]),
    el('div', { class: 'col-xs-5' },
      startSeatsArr.map(() => generateSeat(currentSeatIndex, allSeatsArr, seatsNumber, scheme),)),
    el('div', { class: 'col-xs-5' },
      startSeatsArr.map(() => generateSeat(currentSeatIndex, allSeatsArr, seatsNumber, scheme),))
  ])
}

function showPlaneTitle(title, passengers) {
  seatMapTitle.textContent = `${ title }  (${ passengers } пассажиров)`
}

function showScheme(scheme) {
  showPlaneTitle(scheme.title, scheme.passengers);
  const schemeNode = scheme.scheme.map((seatsNumber, index) =>
    createSchemeNode(seatsNumber, index, scheme));
  const fragment = schemeNode.reduce((fragment, currentValue) => {
    fragment.appendChild(currentValue);
    return fragment;
  }, document.createDocumentFragment());

  while (seatMapDiv.firstChild) {
    seatMapDiv.removeChild(seatMapDiv.lastChild);
  }
  seatMapDiv.appendChild(fragment);
  seats = Array.from(document.querySelectorAll('.seat'));
}

function addClass(seats) {
  seats.forEach((seat) => {
    seat.classList.add('adult')
  })
}

function removeClass(seats) {
  seats.forEach((seat) => {
    seat.classList.remove('adult')
  })
}

function updateSeatsInfo(seat) {
  totalPax.innerText =
    seatMapDiv.querySelectorAll('.adult').length + seatMapDiv.querySelectorAll('.half').length;
  totalAdult.innerText = seatMapDiv.querySelectorAll('.adult').length;
  totalHalf.innerText = seatMapDiv.querySelectorAll('.half').length
}

function init() {
  btnSeatMap.addEventListener('click', loadPlaneInfo);
  btnSetFull.addEventListener('click', (event) => {
    event.preventDefault();
    addClass(seats)
    updateSeatsInfo(event)
  });
  btnSetEmpty.addEventListener('click', (event) => {
    event.preventDefault();
    removeClass(seats)
    updateSeatsInfo(event)
  });
  seatMapDiv.addEventListener('click', (event) => {
    let seat = event.target;
    while (!seat.classList.contains('seat')) {
      seat = seat.parentElement;
      if (!seat) {
        return
      }
    }
    if (seat.classList.contains('adult') || seat.classList.contains('half')) {
      seat.classList.remove('adult');
      seat.classList.remove('half');
      updateSeatsInfo(seat)
    } else {
      if (event.altKey) {
        seat.classList.add('half');
        updateSeatsInfo(seat)
      } else {
        seat.classList.add('adult');
        updateSeatsInfo(seat)
      }
    }
  })
}

document.addEventListener('DOMContentLoaded', init);









