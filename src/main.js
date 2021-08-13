import {RenderPosition, renderElement} from './utils/render.js';

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

  renderElement(container, filmCardView, RenderPosition.BEFOREEND);

  const modal = new FilmDetailsView(film);

  const openFilmDetailPopup = () => {
    siteMainElement.appendChild(modal.getElement());
    body.classList.toggle('hide-overflow');
  };

  const closeFilmDetailPopup = () => {
    siteMainElement.removeChild(modal.getElement());
    body.classList.toggle('hide-overflow');
  };

  filmCardView.setTitleClickHandler(() => {
    openFilmDetailPopup();
  });

  filmCardView.setPosterClickHandler(() => {
    openFilmDetailPopup();
  });

  filmCardView.setCommentsClickHandler(() => {
    openFilmDetailPopup();
  });

  modal.setClickHandler(() => {
    closeFilmDetailPopup();
  });

};

const createOrdinaryFilmCards = () => {
  renderElement(siteMainElement, new FilmsSectionView(), RenderPosition.BEFOREEND);

  const filmElement = document.querySelector('.films');

  renderElement(filmElement, new FilmListView(), RenderPosition.BEFOREEND);

  const cardContainer = document.querySelector('.films-list__container');
  const filmList = filmElement.querySelector('.films-list');

  for (let i = 0; i < Math.min(filmsData.length, CARDS_COUNT_PER_STEP); i++) {
    renderFilm(cardContainer, filmsData[i]);
  }

  if (filmsData.length > CARDS_COUNT_PER_STEP) {
    let renderFilmCount = CARDS_COUNT_PER_STEP;

    const showMoreButtonComponent = new ShowMoreButtonView();
    renderElement(filmList, showMoreButtonComponent, RenderPosition.BEFOREEND);

    showMoreButtonComponent.setClickHandler(() => {
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

  renderElement(filmElement, new FilmListExtraView(title), RenderPosition.BEFOREEND);

  const extraList = filmElement.lastChild;
  const cardContainer = extraList.querySelector('.films-list__container');

  for (let i = 0; i < EXTRA_CARDS_COUNT; i++) {
    renderFilm(cardContainer, filmsData[i]);
  }
};

renderElement(siteHeaderElement, new UserProfileView(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SortView(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SiteNavigationView(filters), RenderPosition.BEFOREEND);
renderElement(footerStatisticsSection, new FooterStatisticView(generateStatisticData()), RenderPosition.AFTERBEGIN);
createOrdinaryFilmCards();
createExtraCardsList('Top rated');
createExtraCardsList('Most commented');
