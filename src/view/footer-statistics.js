import SmartView from './smart.js';

const createStatisticsTemplate = (data) => (
  `<p class="footer__statistics-counter">${data.films ? `${data.films.length} movies inside` : 'Loading films...'}</p>`
);

export default class FooterStatistic extends SmartView {
  constructor(filmsModel) {
    super();
    this._filmsModel = filmsModel;
    this._data = {
      films: null,
    };
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._filmsModel.addObserver(this._handleModelEvent);
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }

  restoreHandlers() {
  }

  _handleModelEvent() {
    this.updateData({
      films: this._filmsModel.getFilms(),
    });
  }
}
