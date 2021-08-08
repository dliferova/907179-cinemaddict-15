import {createElement} from '../utils.js';

const createFilmsSection = () => '<section class="films"></section>';

export default class FilmsSection {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsSection();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
