'use strict';

const app = document.querySelector('.app'),
  takePhotoBtn = app.querySelector('#take-photo'),
  errorMess = app.querySelector('#error-message'),
  photoList = document.querySelector('.list'),
  controls = app.querySelector('.controls');

const video = document.createElement('video'),
  image = document.createElement('img'),
  audio = document.createElement('audio'),
  canvas = document.createElement('canvas'),
  ctx = canvas.getContext('2d');

app.appendChild(video);
app.appendChild(audio);
app.appendChild(image);
takePhotoBtn.style.position = 'absolute';
controls.style.display = 'block';


function takePhoto() {
  window.navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true
  })
    .then((stream) => {

      video.srcObject = stream;

      takePhotoBtn.addEventListener('click', (event) => {
        audio.src = './audio/click.mp3';
        audio.play();

        setTimeout(() => {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0);
          image.src = canvas.toDataURL();
          stream.getVideoTracks().map(track => track.stop());

        }, 100)
      });

      video.play();
    })
    .catch(() => {
      console.error('oh noes err')
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

function createImgCard() {
  return el('figure', {}, [
    el('img', { src: canvas.toDataURL() }, ''),
    el('figcaption', {}, ''),
    el('a', { href: canvas.toDataURL(), download: 'snapshot.png' }, [
      el('i', { class: 'material-icons' }, 'file_download')
    ]), el('a', {}, [
      el('i', { class: 'material-icons' }, 'file_upload')
    ]), el('a', {}, [
      el('i', { class: 'material-icons' }, 'delete')
    ])
  ])
}

const imgCard = createImgCard();
document.createDocumentFragment();
document.body.appendChild(imgCard);
photoList.appendChild(imgCard);

// function showPhotoList(photoCard) {
//   const photoCardsArr = [];
//   photoCardsArr.push(photoCard)
//   const commentNodes = photoCardsArr.map(createImgCard);
//
//   const fragment = commentNodes.reduce((documentFragment, currentValue) => {
//     documentFragment.appendChild(currentValue);
//     return documentFragment;
//   }, document.createDocumentFragment());
//   document.body.appendChild(fragment)
// }
//
// showPhotoList(imgCard)



// <figure>
// <img src="path/to/pic.png">
//   <figcaption>
//   <a href="path/to/pic.png" download="snapshot.png">
//   <i class="material-icons">file_download</i>
//   </a>
//   <a><i class="material-icons">file_upload</i></a>
// <a><i class="material-icons">delete</i></a>
// </figcaption>
// </figure>

document.addEventListener('DOMContentLoaded', takePhoto);

