'use strict';

const content = document.querySelector('.content');

content.style.display = 'initial';

const name = document.querySelector('[data-name]'),
  description = document.querySelector('[data-description]'),
  pic = document.querySelector('[data-pic]'),
  position = document.querySelector('[data-position]'),
  technologies = document.querySelector('[data-technologies]'),
  badgesCard = document.querySelector('.badgescard'),
  userDataUrl = 'https://neto-api.herokuapp.com/profile/me';

function showUserProfile(user) {
  description.textContent = user.description;
  pic.src = user.pic;
  name.textContent = user.name;
  position.textContent = user.position;

  return user.id
}

function loadUserProfileData(url) {
  return new Promise((done, fail) => {
    window.showUserData = done;

    const script = document.createElement('script');
    script.src = `${ url }?jsonp=showUserData`;
    document.body.appendChild(script)
  });
}

function loadUserTechnologiesData(profileId) {
  return new Promise((done, fail) => {
    window.showUserTechnologiesData = done;

    const script = document.createElement('script');
    script.src = `https://neto-api.herokuapp.com/profile/${ profileId }/technologies?jsonp=showUserTechnologiesData`;
    document.body.appendChild(script)
  });
}

function showUserTechnologiesData(technologies) {
  technologies.forEach((technology) => {
    badgesCard.innerHTML += `<span class="devicons devicons-${ technology }"></span>`
  })

}

loadUserProfileData(userDataUrl)
  .then(showUserProfile)
  .then(loadUserTechnologiesData)
  .then(showUserTechnologiesData);


