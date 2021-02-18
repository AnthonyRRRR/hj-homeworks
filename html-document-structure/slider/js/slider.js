const slider = document.querySelector('.slider');
const sliderNav = document.querySelector('.slider-nav');
const slidesBlock = slider.querySelector('.slides');
const nextButton = sliderNav.querySelector('a[data-action="next"]');
const prevButton = sliderNav.querySelector('a[data-action="prev"]');
const firstButton = sliderNav.querySelector('a[data-action="first"]');
const lastButton = sliderNav.querySelector('a[data-action="last"]');
const slides = Array.from(slider.querySelectorAll('.slide'));
const firstSlide = slidesBlock.firstElementChild;
firstSlide.classList.add('slide-current');
const lastSlide = slidesBlock.lastElementChild;

const setCurrentSlide = (slide) => {
  slides.forEach((slide) => {
    slide.classList.remove('slide-current')
  });
  slide.classList.add('slide-current');

  if (slide.previousElementSibling) {
    activateButton(prevButton);
    activateButton(firstButton)
  } else {
    disableButton(prevButton);
    disableButton(firstButton);
  }

  if (slide.nextElementSibling) {
    activateButton(nextButton);
    activateButton(lastButton)
  } else {
    disableButton(nextButton);
    disableButton(lastButton)
  }

};

setCurrentSlide(firstSlide);

function activateButton(button) {
  button.disabled = false;
  button.classList.remove('disabled');
}

function disableButton(button) {
  button.disabled = true;
  button.classList.add('disabled')
}

function moveSlide(isForward) {
  const slideCurrent = slider.querySelector('.slide-current');
  const activeSlide = isForward ? slideCurrent.nextElementSibling : slideCurrent.previousElementSibling;
  if (activeSlide) {
    setCurrentSlide(activeSlide);
  }
}

nextButton.addEventListener('click', () => {
  moveSlide(true)
});

prevButton.addEventListener('click', () => {
  moveSlide(false)
});

firstButton.addEventListener('click', () => {
  setCurrentSlide(firstSlide)
});

lastButton.addEventListener('click', () => {
  setCurrentSlide(lastSlide)
});
// const slideList = Array.from(slidesBlock.children);
// console.log(slideList);
// function sliderMove(isForward) {
//   const currentSlide = slider.querySelector('.slide-current');
//   currentSlide.classList.add('slide-current');
//   slides.forEach((slide) => {
//     slide.classList.remove('slide-current')
//   });
//   const activeSlide = isForward ? currentSlide.nextElementSibling : currentSlide.previousElementSibling;
//   currentSlide.classList.remove('slide-current');
//   activeSlide.classList.add('slide-current');
//
//
//
//   if (!activeSlide.nextElementSibling) {
//     nextButton.disabled = true;
//     lastButton.disabled = true;
//     nextButton.classList.add('disabled');
//     lastButton.classList.add('disabled')
//   } else {
//     nextButton.disabled = false;
//     lastButton.disabled = false;
//     nextButton.classList.remove('disabled');
//     lastButton.classList.remove('disabled');
//   }
//
//   if (!activeSlide.previousElementSibling) {
//     prevButton.disabled = true;
//     firstButton.disabled = true;
//     prevButton.classList.add('disabled');
//     firstButton.classList.add('disabled');
//   } else {
//     prevButton.disabled = false;
//     firstButton.disabled = false;
//     prevButton.classList.remove('disabled');
//     firstButton.classList.remove('disabled');
//   }
//
// }
//
// function firstButtonClick(){
//   firstSlide.classList.add('slide-current');
//   activeSlide.classList.remove('slide-current');
// }
//
// function lastButtonClick() {
//   lastSlide.classList.add('slide-current');
//   activeSlide.classList.remove('slide-current');
// }
//
// lastButton.addEventListener('click', lastButtonClick);
// firstButton.addEventListener('click', firstButtonClick);
//
// nextButton.addEventListener('click', (event) => {
//   sliderMove(true)
// });
// prevButton.addEventListener('click', (event) => {
//   sliderMove(false)
// });








