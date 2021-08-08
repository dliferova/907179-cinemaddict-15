import {renderElement, RenderPosition} from './utils.js';

import UserProfileView from './view/user-profile.js';
import SortView from './view/sort.js';
import ShowMoreButtonView from './view/show-more-button.js';
import FilmsSectionView from './view/films-section.js';
import FilmListView from './view/films-list.js';
import FilmListExtraView from './view/film-list-extra.js';
import FilmDetailsView from './view/popup-view.js';
import SiteNavigationView from './view/site-navigation.js';
import FilmCardView from './view/film-card.js';
import FooterStatisticView from './view/footer-statistics.js';
import {generateStatisticData} from './mock/footer-statistics-mock.js';
import {generateFilmCard} from './mock/film-card-mock.js';
import {filmToFilterMap} from './mock/filters-mock.js';
// import StatisticSectionView from './view/statistics-page.js';

const CARDS_COUNT_PER_STEP = 5;
const EXTRA_CARDS_COUNT = 2;
const FILM_TOTAL = 17;

const filmsData = new Array(FILM_TOTAL).fill(null).map(generateFilmCard);
const filters = filmToFilterMap(filmsData);

const body = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerStatisticsSection = document.querySelector('.footer__statistics');


const renderFilm = (container, film) => {
  const filmCardView = new FilmCardView(film);

  renderElement(container, filmCardView.getElement(), RenderPosition.BEFOREEND);

  const modal = new FilmDetailsView(film);

  const openFilmDetailPopup = () => {
    siteMainElement.appendChild(modal.getElement());
    body.classList.toggle('hide-overflow');
  };

  const closeFilmDetailPopup = () => {
    siteMainElement.removeChild(modal.getElement());
    body.classList.toggle('hide-overflow');
  };

  filmCardView.getElement().querySelector('.film-card__title').addEventListener('click', (evt) => {
    evt.preventDefault();
    openFilmDetailPopup();
  });

  filmCardView.getElement().querySelector('.film-card__poster').addEventListener('click', (evt) => {
    evt.preventDefault();
    openFilmDetailPopup();
  });

  filmCardView.getElement().querySelector('.film-card__comments').addEventListener('click', (evt) => {
    evt.preventDefault();
    openFilmDetailPopup();
  });

  modal.getElement().querySelector('.film-details__close-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    closeFilmDetailPopup();
  });

};

const createOrdinaryFilmCards = () => {
  renderElement(siteMainElement, new FilmsSectionView().getElement(), RenderPosition.BEFOREEND);

  const filmElement = document.querySelector('.films');

  renderElement(filmElement, new FilmListView().getElement(), RenderPosition.BEFOREEND);

  const cardContainer = document.querySelector('.films-list__container');
  const filmList = filmElement.querySelector('.films-list');

  for (let i = 0; i < Math.min(filmsData.length, CARDS_COUNT_PER_STEP); i++) {
    renderFilm(cardContainer, filmsData[i]);
  }

  if (filmsData.length > CARDS_COUNT_PER_STEP) {
    let renderFilmCount = CARDS_COUNT_PER_STEP;

    const showMoreButtonComponent = new ShowMoreButtonView();
    renderElement(filmList, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

    showMoreButtonComponent.getElement().addEventListener('click', (evt) => {
      evt.preventDefault();
      filmsData.slice(renderFilmCount, renderFilmCount + CARDS_COUNT_PER_STEP)
        .forEach((film) => renderFilm(cardContainer, film));

      renderFilmCount += CARDS_COUNT_PER_STEP;

      if (renderFilmCount >= filmsData.length) {
        showMoreButtonComponent.getElement().remove();
      }
    });
  }
};

const createExtraCardsList = (title) => {
  const filmElement = document.querySelector('.films');

  renderElement(filmElement, new FilmListExtraView(title).getElement(), RenderPosition.BEFOREEND);

  const extraList = filmElement.lastChild;
  const cardContainer = extraList.querySelector('.films-list__container');

  for (let i = 0; i < EXTRA_CARDS_COUNT; i++) {
    renderFilm(cardContainer, filmsData[i]);
  }
};

renderElement(siteHeaderElement, new UserProfileView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SiteNavigationView(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(footerStatisticsSection, new FooterStatisticView(generateStatisticData()).getElement(), RenderPosition.AFTERBEGIN);
createOrdinaryFilmCards();
createExtraCardsList('Top rated');
createExtraCardsList('Most commented');
