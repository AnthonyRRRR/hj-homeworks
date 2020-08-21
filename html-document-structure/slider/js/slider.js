const slider = document.querySelector('.slider');
const sliderNav = document.querySelector('.slider-nav');
const slidesBlock = slider.querySelector('.slides');
const nextButton = sliderNav.querySelector('a[data-action="next"]');
const prevButton = sliderNav.querySelector('a[data-action="prev"]');
const firstButton = sliderNav.querySelector('a[data-action="first"]');
const lastButton = sliderNav.querySelector('a[data-action="last"]');
const slides = Array.from(slider.querySelectorAll('.slide'));
const firstSlide = slidesBlock.firstElementChild;
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



