'use strict';
const food = document.querySelector('.food');

const pic = food.querySelector('[data-pic]'),
  title = food.querySelector('[data-title]'),
  ingredients = food.querySelector('[data-ingredients]'),
  ratingEl = food.querySelector('[data-rating]'),
  star = food.querySelector('[data-star]'),
  votes = food.querySelector('[data-votes]'),
  consumersEl = food.querySelector('[data-consumers]');

let recipeId;

function showRecipeFood(food) {
  let id = food.id;
  title.textContent = food.title;
  ingredients.textContent = food.ingredients;
  pic.style.backgroundImage = `url(${ food.pic })`;

  return id;
}

function loadRecipeFood(url) {
  return new Promise((done, fail) => {
    window.showRecipeData = done;

    const script = document.createElement('script');
    script.src = `${ url }?jsonp=showRecipeData`;
    document.body.appendChild(script)
  })
}

function loadRatingRecipe(id) {
  return new Promise((done, fail) => {
    window.showRecipeRatingData = done;
    recipeId = id;
    const script = document.createElement('script');
    script.src = `https://neto-api.herokuapp.com/food/${ id }/rating?jsonp=showRecipeRatingData`;
    document.body.appendChild(script)
  })
}

function showRatingRecipe(rating) {
  ratingEl.textContent = rating.rating;
  votes.textContent = rating.votes;

  star.style.width = `${ rating.rating / 10 * 100 }%`;
}

function loadConsumersList(id) {
  return new Promise((done, fail) => {
    window.showConsumersListData = done;
    id = recipeId;
    const script = document.createElement('script');
    script.src = `https://neto-api.herokuapp.com/food/${ id }/consumers?jsonp=showConsumersListData`;
    document.body.appendChild(script)
  })
}

function showConsumersList(consumersList) {
  console.log(consumersList);
  const consumersArr = consumersList.consumers;
  const total = consumersList.total;

  consumersArr.forEach((consumer) => {
    consumersEl.innerHTML += '';
    consumersEl.innerHTML += `<img src="${ consumer.pic }"title="${ consumer.name }">`
  });
  const span = document.createElement('span');
  span.textContent = `+${ total - consumersArr.length }`;
  consumersEl.appendChild(span)
}


loadRecipeFood('https://neto-api.herokuapp.com/food/42')
  .then(showRecipeFood)
  .then(loadRatingRecipe)
  .then(showRatingRecipe)
  .then(loadConsumersList)
  .then(showConsumersList);

