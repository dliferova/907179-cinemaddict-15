import {renderTemplate, renderElement, RenderPosition} from './utils.js';

import UserProfileView from './view/user-profile.js';
import SortView from './view/sort.js';
import ShowMoreButtonView from './view/show-more-button.js';
import FilmsSectionView from './view/films-section.js';

import {createSiteNavigationTemplate} from './view/navigation-view.js';
import {createExtraFilmsList, createFilmsList} from './view/films-list-view.js';
import {createFilmCardTemplate} from './view/film-card-view.js';
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

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerStatisticsSection = document.querySelector('.footer__statistics');


const createOrdinaryFilmCards = () => {
  renderElement(siteMainElement, new FilmsSectionView().getElement(), RenderPosition.BEFOREEND);

  const filmElement = document.querySelector('.films');

  renderTemplate(filmElement, createFilmsList(), 'beforeend');

  const cardContainer = document.querySelector('.films-list__container');
  const filmList = filmElement.querySelector('.films-list');

  for (let i = 0; i < Math.min(films.length, CARDS_COUNT_PER_STEP); i++) {
    renderTemplate(cardContainer, createFilmCardTemplate(films[i]), 'beforeend');
  }

  if (films.length > CARDS_COUNT_PER_STEP) {
    let renderFilmCount = CARDS_COUNT_PER_STEP;

    const showMoreButtonComponent = new ShowMoreButtonView();
    renderElement(filmList, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

    showMoreButtonComponent.getElement().addEventListener('click', (evt) => {
      evt.preventDefault();
      films.slice(renderFilmCount, renderFilmCount + CARDS_COUNT_PER_STEP)
        .forEach((film) => renderTemplate(cardContainer, createFilmCardTemplate(film), 'beforeend'));

      renderFilmCount += CARDS_COUNT_PER_STEP;

      if (renderFilmCount >= films.length) {
        showMoreButtonComponent.getElement().remove();
      }
    });
  }
};

const createExtraCardsList = (title) => {
  const filmElement = document.querySelector('.films');

  renderTemplate(filmElement, createExtraFilmsList(title), 'beforeend');

  const extraList = filmElement.lastChild;
  const cardContainer = extraList.querySelector('.films-list__container');

  for (let i = 0; i < EXTRA_CARDS_COUNT; i++) {
    renderTemplate(cardContainer, createFilmCardTemplate(films[i]), 'beforeend');
  }
};

renderTemplate(siteHeaderElement, new UserProfileView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);

renderTemplate(siteMainElement, createSiteNavigationTemplate(filters), 'beforeend');
createOrdinaryFilmCards();
createExtraCardsList('Top rated');
createExtraCardsList('Most commented');
renderTemplate(footerStatisticsSection, createStatisticsTemplate(generateStatisticData()), 'afterbegin');
renderTemplate(siteMainElement, showFilmDetails(films[0]), 'beforeend');
