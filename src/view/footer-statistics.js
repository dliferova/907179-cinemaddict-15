import {createElement} from '../utils.js';

const createStatisticsTemplate = (statistics) => (
  `<p class="footer__statistics-counter">${statistics.totalMoviesCount} movies inside</p>
`);

export default class FooterStatistic {
  constructor(statistics) {
    this._statistics = statistics;
    this._element = null;
  }

  getTemplate() {
    return createStatisticsTemplate(this._statistics);
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
