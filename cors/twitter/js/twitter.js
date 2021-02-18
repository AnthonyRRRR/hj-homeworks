'use strict';

const wallpaper = document.querySelector('[data-wallpaper]'),
  username = document.querySelector('[data-username]'),
  description = document.querySelector('[data-description]'),
  pic = document.querySelector('[data-pic]'),
  tweets = document.querySelector('[data-tweets]'),
  followers = document.querySelector('[data-followers]'),
  following = document.querySelector('[data-following]');

function showUser(user) {
  wallpaper.src = user.wallpaper;
  username.textContent = user.username;
  description.textContent = user.description;
  pic.src = user.pic;
  tweets.textContent = user.tweets;
  followers.textContent = user.followers;
  following.textContent = user.following;
}

function loadData(url) {
  return new Promise((done, fail) => {
    window.showUserData = done;

    const script = document.createElement('script');
    script.src = `${ url }?jsonp=showUserData`;
    document.body.appendChild(script)
  })
}

loadData('https://neto-api.herokuapp.com/twitter/jsonp')
   .then(showUser);




