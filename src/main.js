import {RenderPosition, renderElement} from './utils/render.js';

import UserProfileView from './view/user-profile.js';
import SortView from './view/sort.js';
import FilmsSectionView from './view/films-section.js';
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

renderElement(siteMainElement, new SortView(), RenderPosition.BEFOREEND);

const filmsSectionComponent = new FilmsSectionView();
renderElement(siteMainElement, filmsSectionComponent, RenderPosition.BEFOREEND);

const ordinaryFilmCarListPresenter = new FilmCardListPresenter(filmsSectionComponent, siteMainElement, body, filmsModel);
ordinaryFilmCarListPresenter.init('All movies. Upcoming', false);

// TODO восстановить filmsData.slice(0, EXTRA_CARDS_COUNT)
const topRatedFilmCarListPresenter = new FilmCardListPresenter(filmsSectionComponent, siteMainElement, body, filmsModel);
topRatedFilmCarListPresenter.init('Top rated', true);

// TODO восстановить filmsData.slice(0, EXTRA_CARDS_COUNT)
const mostCommentedFilmCarListPresenter = new FilmCardListPresenter(filmsSectionComponent, siteMainElement, body, filmsModel);
mostCommentedFilmCarListPresenter.init('Most commented', true);

