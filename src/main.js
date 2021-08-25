import {RenderPosition, renderElement} from './utils/render.js';

import UserProfileView from './view/user-profile.js';
import SortView from './view/sort.js';
import FilmsSectionView from './view/films-section.js';
import SiteNavigationView from './view/site-navigation.js';
import FooterStatisticView from './view/footer-statistics.js';
import {generateStatisticData} from './mock/footer-statistics-mock.js';
import {generateFilmCard} from './mock/film-card-mock.js';
import {filmToFilterMap} from './mock/filters-mock.js';
// import StatisticSectionView from './view/statistics-page.js';
import FilmCardListPresenter from './presenter/film-card-list-presenter.js';

const EXTRA_CARDS_COUNT = 2;
const FILM_TOTAL = 17;

const filmsData = new Array(FILM_TOTAL).fill(null).map(() => generateFilmCard());
const filters = filmToFilterMap(filmsData);

const body = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerStatisticsSection = document.querySelector('.footer__statistics');

renderElement(siteHeaderElement, new UserProfileView(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SortView(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SiteNavigationView(filters), RenderPosition.BEFOREEND);
renderElement(footerStatisticsSection, new FooterStatisticView(generateStatisticData()), RenderPosition.AFTERBEGIN);


const filmsSectionComponent = new FilmsSectionView();
renderElement(siteMainElement, filmsSectionComponent, RenderPosition.BEFOREEND);

const ordinaryFilmCarListPresenter = new FilmCardListPresenter(filmsSectionComponent, siteMainElement, body);
ordinaryFilmCarListPresenter.init('All movies. Upcoming', false, filmsData);

const topRatedFilmCarListPresenter = new FilmCardListPresenter(filmsSectionComponent, siteMainElement, body);
topRatedFilmCarListPresenter.init('Top rated', true, filmsData.slice(0, EXTRA_CARDS_COUNT));

const mostCommentedFilmCarListPresenter = new FilmCardListPresenter(filmsSectionComponent, siteMainElement, body);
mostCommentedFilmCarListPresenter.init('Most commented', true, filmsData.slice(0, EXTRA_CARDS_COUNT));
