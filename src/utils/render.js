import Abstract from '../view/abstract.js';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const renderElement = (root, child, position) => {
  if (root instanceof Abstract) {
    root = root.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (position) {
    case RenderPosition.AFTERBEGIN:
      root.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      root.append(child);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const removeElement = (root) => {
  if (!(root instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  root.getElement().remove();
  root.removeElement();
};

export const replaceElement = (oldChild, newChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || newChild === null || oldChild === null) {
    throw new Error('Don\'t work with unexisting elements');
  }

  parent.replaceChild(newChild, oldChild);
};
