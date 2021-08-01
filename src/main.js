import {createUserProfileTemplate} from './view/user-profile.js';
import {createNavigationTemplate} from './view/navigation.js';
import {createFilterTemplate} from './view/sort.js';
import {createFilmCardContainer} from './view/films-list.js';
import {createFilmsList} from './view/films-list.js';
import {createExtraFilmsList} from './view/films-list.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createButton} from './view/ordinary-button.js';
import {showFilmDetails} from './view/popup.js';
import {createStatisticksTemplate} from './view/footer-statistics.js';
// import {createStatisticSection} from './view/stats.js';
import {generateFilm} from './mock/film.js';

const CARDS_COUNT = 5;
const EXTRA_CARDS_COUNT = 2;
const FILM_COUNT = 17;

const films = new Array(FILM_COUNT).fill(null).map(generateFilm);

const renderComponent = (root, template, position) => {
  root.insertAdjacentHTML(position, template);
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerStatisticsSection = document.querySelector('.footer__statistics');

const createOrdinaryFilmCards = () => {
  renderComponent(siteMainElement, createFilmCardContainer(), 'beforeend');

  const filmElement = document.querySelector('.films');

  renderComponent(filmElement, createFilmsList(), 'beforeend');

  const cardContainer = document.querySelector('.films-list__container');
  const filmList = filmElement.querySelector('.films-list');

  for (let i = 0; i < CARDS_COUNT; i++) {
    renderComponent(cardContainer, createFilmCardTemplate(films[i]), 'beforeend');
  }

  renderComponent(filmList, createButton(), 'beforeend');
};

const createExtraCardsList = (title) => {
  const filmElement = document.querySelector('.films');

  renderComponent(filmElement, createExtraFilmsList(title), 'beforeend');

  const extraList = filmElement.lastChild;
  const cardContainer = extraList.querySelector('.films-list__container');

  for (let i = 0; i < EXTRA_CARDS_COUNT; i++) {
    renderComponent(cardContainer, createFilmCardTemplate(), 'beforeend');
  }
};


renderComponent(siteHeaderElement, createUserProfileTemplate(), 'beforeend');
renderComponent(siteMainElement, createNavigationTemplate(), 'beforeend');
renderComponent(siteMainElement, createFilterTemplate(), 'beforeend');
createOrdinaryFilmCards();
createExtraCardsList('Top rated');
createExtraCardsList('Most commented');
renderComponent(footerStatisticsSection, createStatisticksTemplate(), 'afterbegin');
renderComponent(siteMainElement, showFilmDetails(), 'beforeend');
