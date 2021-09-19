import {RenderPosition, renderElement, removeElement} from './utils/render.js';

import {FilterType, MenuItem, UpdateType, api} from './const.js';
import UserProfileView from './view/user-profile.js';
import FooterStatisticView from './view/footer-statistics.js';
import FilmCardListPresenter from './presenter/film-card-list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter.js';
import FilmsModel from './model/films.js';
import StatisticSectionView from './view/stats.js';

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();

const body = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerStatisticsSection = document.querySelector('.footer__statistics');

renderElement(siteHeaderElement, new UserProfileView(filmsModel), RenderPosition.BEFOREEND);
renderElement(footerStatisticsSection, new FooterStatisticView(filmsModel), RenderPosition.AFTERBEGIN);

const filmCardListPresenter = new FilmCardListPresenter(siteMainElement, body, filmsModel, filterModel, api);
const statsView = new StatisticSectionView(filmsModel);

const showFilms = () => {
  removeElement(statsView);
  filmCardListPresenter.init();
};

const showStats = () => {
  filmCardListPresenter.destroy();
  statsView.init();
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

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });
