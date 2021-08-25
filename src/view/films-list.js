import AbstractView from './abstract.js';

const createFilmsListTemplate = (title, isExtra) => (
  `<section class="films-list ${isExtra ? 'films-list--extra' : ''}">
    <h2 class="films-list__title ${isExtra ? '' : 'visually-hidden'}">${title}</h2>
    <div class="films-list__container">
    </div>
  </section>`
);

export default class FilmList extends AbstractView {
  constructor(title, isExtra) {
    super();
    this._title = title;
    this._isExtra = isExtra;
  }

  getTemplate() {
    return createFilmsListTemplate(this._title, this._isExtra);
  }

  getFilmsContainer() {
    return this.getElement().querySelector('.films-list__container');
  }
}
