import {RenderPosition, renderElement} from './utils/render.js';

import UserProfileView from './view/user-profile.js';
import FooterStatisticView from './view/footer-statistics.js';
import {generateStatisticData} from './mock/footer-statistics-mock.js';
import {generateFilmCard} from './mock/film-card-mock.js';
// import StatisticSectionView from './view/statistics-page.js';
import FilmCardListPresenter from './presenter/film-card-list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter.js';
import FilmsModel from './model/films.js';

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

const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
filterPresenter.init();

const filmCardListPresenter = new FilmCardListPresenter(siteMainElement, body, filmsModel, filterModel);
filmCardListPresenter.init();
