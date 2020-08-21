const content = document.getElementById('content');

const request = new XMLHttpRequest();
request.addEventListener('load', onLoad);
request.open('GET', "https://neto-api.herokuapp.com/book/", true);
request.send();

function onLoad() {
  const books = JSON.parse(request.responseText);
  console.log(books);
  content.innerHTML = '';
  books.forEach((book) => {content.innerHTML += `<li data-title = "${ book.title }"
                            data-author = "${ book.author.name }" 
                            data-info="${ book.info }"
                            data-price = "${ book.price }">
                            \`<img src = "${ book.cover.small }">\`
                                                                </li>`;
  })
}

addEventListener('load', onLoad);
