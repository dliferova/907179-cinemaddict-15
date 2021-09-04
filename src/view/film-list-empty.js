import AbstractView from './abstract.js';
import {FilterType} from '../const.js';

const NoFilmsTextType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCH_LIST]: 'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITES]: 'There are no favorite movies now',
};

const createNoFilmsTemplate = (filterType) => {
  const noFilmTextValue = NoFilmsTextType[filterType];

  return (
    `<section class="films-list">
      <h2 class="films-list__title">${noFilmTextValue}</h2>
    </section>`
  );
};

export default class NoFIlm extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createNoFilmsTemplate(this._data);
  }
}
