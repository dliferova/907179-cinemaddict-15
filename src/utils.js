import dayjs from 'dayjs';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const renderElement = (root, element, position) => {
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      root.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      root.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const generateRandomDate = (start, end) => dayjs(new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())));

export const getRandomFromRange = function (startNumber = 0, endNumber = 0) {
  if (startNumber < 0) {
    startNumber = 0;
  }

  if (endNumber < 0) {
    endNumber = 0;
  }

  if (endNumber < startNumber) {
    const tmp = startNumber;
    startNumber = endNumber;
    endNumber = tmp;
  }

  return Math.floor(Math.random() * (startNumber - endNumber + 1)) + endNumber;
};
