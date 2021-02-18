'use strict';

const poolingSection = document.querySelector('.pooling');
const poolingCards = Array.from(poolingSection.querySelectorAll('div'));

function setPoolingCard() {
  fetch('https://neto-api.herokuapp.com/comet/pooling')
    .then((res) => {
      return res.text()
    })
    .then((data) => {
      const num = Number(data)

      poolingCards.forEach((card) => {
        card.classList.remove('flip-it')
      });

      poolingCards[num-1].classList.add('flip-it')
    });
}

setInterval(setPoolingCard, 5000);
