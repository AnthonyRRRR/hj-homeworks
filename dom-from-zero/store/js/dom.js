'use strict';

function createElement(node) {
  const element = document.createElement(node.name),
    elementChilds = node.childs,
    elementAttributes = node.props;
  if (typeof node === 'string') {
    return document.createTextNode(node)
  } else if (typeof node === 'object') {
    if (elementAttributes && typeof elementAttributes === 'object') {
      Object.keys(elementAttributes).forEach(i => element.setAttribute(i, elementAttributes[i]));
    }

    if (typeof elementChilds === 'string') {
      element.textContent = node.childs
    } else if (elementChilds instanceof Array) {
      elementChilds.forEach(child => element.appendChild(createElement(child)));
    }
  }

  return element
}


