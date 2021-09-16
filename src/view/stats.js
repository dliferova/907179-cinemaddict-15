import SmartView from './smart.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getDatePeriod, getTotalDuration} from '../utils/stats-utils.js';
import {StatsFilterType} from '../const.js';

const BAR_HEIGHT = 50;

const getSortedGenre = (films) => {
  const genres = {};
  const sortedGenres = [];

  films.forEach((film) => {
    film.genres.forEach((genre) => {
      genres[genre] = genres[genre] ? ++genres[genre] : 1;
    });
  });

  for (const [genre, count] of Object.entries(genres)) {
    sortedGenres.push([genre, count]);
  }

  return sortedGenres.sort((a, b) => b[1] - a[1]);
};

const renderChart = (statisticCtx, watchedFilms) => {
  const groups = getSortedGenre(watchedFilms);

  const labels = groups.map((group) => group[0]);
  const counts = groups.map((group) => group[1]);

  statisticCtx.height = BAR_HEIGHT * groups.length;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: labels,
      datasets: [{
        data: counts,
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#ffffff',
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 24,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatisticTemplate = (data) => {
  const {films, period} = data;

  const watchedFilms = films.filter((film) => !!film.watchingDate && film.watchingDate.isBefore(period.to) && film.watchingDate.isAfter(period.from));

  const groups = getSortedGenre(watchedFilms);
  const topGenre = groups.length > 0 ? groups[0][0] : null;

  const totalDuration = getTotalDuration(watchedFilms);

  return `<section class="statistic">
    <p class="statistic__rank">Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">Movie buff</span>
    </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>
    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${watchedFilms.length}<span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${totalDuration.hour}<span class="statistic__item-description">h</span>${totalDuration.min}<span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre !== null ? topGenre : ''}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>
  </section>`;
};

export default class Statistic extends SmartView {
  constructor(filmsModel) {
    super();
    this._filmsModel = filmsModel;
    this._data = Statistic.parseToData(filmsModel.getFilms(), getDatePeriod(StatsFilterType.ALL_TIME));
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._statFilterClickHandler = this._statFilterClickHandler.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._setInnerHandlers();
    this._inputValue = StatsFilterType.ALL_TIME;
  }

  init() {
    this._renderChart();
  }

  getTemplate() {
    return createStatisticTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    for (const button of this.getElement().querySelectorAll('.statistic__filters-input')) {
      button.addEventListener('click', this._statFilterClickHandler);
    }
  }

  _checkFilterPeriod() {
    this.getElement().querySelector('.statistic__filters')
      .querySelectorAll('input').forEach((input) => {
        input.checked = input.value === this._inputValue;});
  }

  _statFilterClickHandler() {
    this.getElement().querySelector('.statistic__filters')
      .addEventListener('change', (evt) => {
        evt.preventDefault();
        this._inputValue = evt.target.value;
        this.updateData({
          period: getDatePeriod(this._inputValue),
        });
        this._checkFilterPeriod();
        this._renderChart();
      });
  }

  _handleModelEvent() {
    this.updateData({
      films: this._filmsModel.getFilms(),
    });
    this._renderChart();
  }

  _renderChart() {
    const chartCtx = this.getElement().querySelector('.statistic__chart');
    const {films, period} = this._data;
    const watchedFilms = films.filter((film) => !!film.watchingDate && film.watchingDate.isBefore(period.to) && film.watchingDate.isAfter(period.from));
    renderChart(chartCtx, watchedFilms);
  }

  static parseToData(films, period) {
    return {
      films: films,
      period: period,
    };
  }
}
