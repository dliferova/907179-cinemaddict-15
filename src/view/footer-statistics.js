import AbstractView from './abstract.js';

const createStatisticsTemplate = (statistics) => (
  `<p class="footer__statistics-counter">${statistics.totalMoviesCount} movies inside</p>
`);

export default class FooterStatistic extends AbstractView {
  constructor(statistics) {
    super();
    this._statistics = statistics;
  }

  getTemplate() {
    return createStatisticsTemplate(this._statistics);
  }
}
