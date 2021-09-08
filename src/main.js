import {RenderPosition, renderElement, removeElement} from './utils/render.js';

import UserProfileView from './view/user-profile.js';
import FooterStatisticView from './view/footer-statistics.js';
import {generateStatisticData} from './mock/footer-statistics-mock.js';
import {generateFilmCard} from './mock/film-card-mock.js';
import FilmCardListPresenter from './presenter/film-card-list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter.js';
import FilmsModel from './model/films.js';
import {FilterType, MenuItem} from './const.js';
import StatisticSectionView from './view/stats.js';

const FILM_TOTAL = 17;

const filmsData = new Array(FILM_TOTAL).fill(null).map(() => generateFilmCard());

const filmsModel = new FilmsModel();
filmsModel.setFilms(filmsData);

const filterModel = new FilterModel();

const body = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerStatisticsSection = document.querySelector('.footer__statistics');

renderElement(siteHeaderElement, new UserProfileView(), RenderPosition.BEFOREEND);
renderElement(footerStatisticsSection, new FooterStatisticView(generateStatisticData()), RenderPosition.AFTERBEGIN);


const filmCardListPresenter = new FilmCardListPresenter(siteMainElement, body, filmsModel, filterModel);
const statsView = new StatisticSectionView();

const showFilms = () => {
  removeElement(statsView);
  filmCardListPresenter.init();
};

const showStats = () => {
  filmCardListPresenter.destroy();
  renderElement(siteMainElement, statsView, RenderPosition.BEFOREEND);
};

let currentMenuItem = MenuItem.FILMS;

const onFilterTypeChange = (updateType, filter) => {
  switch (filter) {
    case FilterType.STATS:
      if (currentMenuItem === MenuItem.FILMS) {
        showStats();
        currentMenuItem = MenuItem.STATISTICS;
      }
      break;
    default:
      if (currentMenuItem === MenuItem.STATISTICS) {
        showFilms();
        currentMenuItem = MenuItem.FILMS;
      }
      break;
  }
};

filterModel.addObserver(onFilterTypeChange);

const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
filterPresenter.init();

filmCardListPresenter.init();

// TODO отдельный презентер для статистики
// const statsPresenter = new StatsPresenter(siteMainElement, body, filmsModel, filterModel);
// statsPresenter.init();
