'use strict';

const longPoolingSection = document.querySelector('.long-pooling');
const longPoolingCards = Array.from(longPoolingSection.querySelectorAll('div'));

function setLongPoolingCard() {
  fetch('https://neto-api.herokuapp.com/comet/long-pooling')
    .then(res => res.text())
    // .then((data) => {
    //   data.split(' ').join('');
    //   return Number(data)
    // })
    .then(data => Number(data))
    .then((data) => {
      longPoolingCards.forEach((card) => {
        card.classList.remove('flip-it')
      });

      longPoolingCards[data - 1].classList.add('flip-it');

      setLongPoolingCard()
    })

}

setLongPoolingCard()