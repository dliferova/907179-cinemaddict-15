import AbstractView from './abstract.js';

const createStatisticsTemplate = (films) => (
  `<p class="footer__statistics-counter">${films ? `${films.length} movies inside` : 'Loading films...' }</p>`
);

export default class FooterStatistic extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createStatisticsTemplate(this._films);
  }
}
