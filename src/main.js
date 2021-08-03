import {createUserProfileTemplate} from './view/user-profile-view.js';
import {createNavigationTemplate} from './view/navigation-view.js';
import {createFilterTemplate} from './view/sort-view.js';
import {createExtraFilmsList, createFilmCardContainer, createFilmsList} from './view/films-list-view.js';
import {createFilmCardTemplate} from './view/film-card-view.js';
import {createButton} from './view/ordinary-button-view.js';
import {showFilmDetails} from './view/popup-view.js';
import {createStatisticsTemplate} from './view/footer-statistics-view.js';
// import {createStatisticSection} from './view/statistics-view.js';
import {generateFilmCard} from './mock/film-card-mock.js';
import {filmToFilterMap} from './mock/filters-mock.js';
import {generateStatisticData} from './mock/footer-statistics-mock.js';

const CARDS_COUNT_PER_STEP = 5;
const EXTRA_CARDS_COUNT = 2;
const FILM_TOTAL = 17;

const films = new Array(FILM_TOTAL).fill(null).map(generateFilmCard);
const filters = filmToFilterMap(films);

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

  for (let i = 0; i < Math.min(films.length, CARDS_COUNT_PER_STEP); i++) {
    renderComponent(cardContainer, createFilmCardTemplate(films[i]), 'beforeend');
  }

  if (films.length > CARDS_COUNT_PER_STEP) {
    let renderFilmCount = CARDS_COUNT_PER_STEP;

    renderComponent(filmList, createButton(), 'beforeend');

    const showMoreButton = filmList.querySelector('.films-list__show-more');

    showMoreButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      films.slice(renderFilmCount, renderFilmCount + CARDS_COUNT_PER_STEP)
        .forEach((film) => renderComponent(cardContainer, createFilmCardTemplate(film), 'beforeend'));

      renderFilmCount += CARDS_COUNT_PER_STEP;

      if (renderFilmCount >= films.length) {
        showMoreButton.remove();
      }
    });
  }
};

const createExtraCardsList = (title) => {
  const filmElement = document.querySelector('.films');

  renderComponent(filmElement, createExtraFilmsList(title), 'beforeend');

  const extraList = filmElement.lastChild;
  const cardContainer = extraList.querySelector('.films-list__container');

  for (let i = 0; i < EXTRA_CARDS_COUNT; i++) {
    renderComponent(cardContainer, createFilmCardTemplate(films[i]), 'beforeend');
  }
};

renderComponent(siteHeaderElement, createUserProfileTemplate(), 'beforeend');
renderComponent(siteMainElement, createNavigationTemplate(filters), 'beforeend');
renderComponent(siteMainElement, createFilterTemplate(), 'beforeend');
createOrdinaryFilmCards();
createExtraCardsList('Top rated');
createExtraCardsList('Most commented');
renderComponent(footerStatisticsSection, createStatisticsTemplate(generateStatisticData()), 'afterbegin');
renderComponent(siteMainElement, showFilmDetails(films[0]), 'beforeend');
