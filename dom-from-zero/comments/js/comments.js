'use strict';

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

function createCommentNode(comment) {
  return el('div', { class: 'comment-wrap' }, [
    el('div', { class: 'photo', title: comment.author.name }, [
      el('div', { class: 'avatar', style: `background-image: url('${ comment.author.pic }')` })
    ]),
    el('div', { class: 'comment-block' }, [
      el('p', { class: 'comment-text' }, comment.text.split('\n').join('\n')),
      el('div', { class: 'bottom-comment' }, [
        el('div', { class: 'comment-date' }, new Date(comment.date).toLocaleString('ru-Ru')),
        el('ul', { class: 'comment-actions' }, [
          el('li', { class: 'complain' }, 'Пожаловаться'),
          el('li', { class: 'reply' }, 'Ответить')
        ])
      ])
    ])
  ])
}

function showComments(comments) {
  const commentNodes = comments.map(createCommentNode);

  const fragment = commentNodes.reduce((documentFragment, currentValue) => {
    documentFragment.appendChild(currentValue);
    return documentFragment;
  }, document.createDocumentFragment());
  document.body.appendChild(fragment)
}


fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then((comments) => {
    showComments(comments)
  });


