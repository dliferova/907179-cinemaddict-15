import {RenderPosition, renderElement} from '../utils/render.js';
import FilmListView from '../view/films-list.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import FilmCardPresenter from './film-card-presenter.js';
import {updateItem} from '../utils/common.js';

const CARDS_COUNT_PER_STEP = 5;

export default class FilmCardList {
  constructor(filmsContainer, mainContainer, bodyContainer) {
    this._filmsContainer = filmsContainer;
    this._mainContainer = mainContainer;
    this._bodyContainer = bodyContainer;
    this._renderedFilmCount = CARDS_COUNT_PER_STEP;
    this._filmCardPresenters = new Map();

    this._handleFilmChange = this._handleFilmChange.bind(this);

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(title, isExtra, films) {
    this._title = title;
    this._isExtra = isExtra;
    this._films = films;

    this._filmListComponent = new FilmListView(title, isExtra);
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._renderFilmList();
  }

  _renderFilmList() {
    renderElement(this._filmsContainer, this._filmListComponent, RenderPosition.BEFOREEND);

    for (let i = 0; i < Math.min(this._films.length, CARDS_COUNT_PER_STEP); i++) {
      this._renderFilmCard(this._films[i]);
    }

    if (!this._isExtra) {
      if (this._films.length > CARDS_COUNT_PER_STEP) {
        this._renderedFilmCount = CARDS_COUNT_PER_STEP;
        this._renderShowMoreButton();
      }
    }
  }

  _renderFilmCard(film) {
    const container = this._filmListComponent.getFilmsContainer();
    const filmCardPresenter = new FilmCardPresenter(container, this._mainContainer, this._bodyContainer, this._handleFilmChange);
    filmCardPresenter.init(film);
    this._filmCardPresenters.set(film.id, filmCardPresenter);
  }

  _renderShowMoreButton() {
    renderElement(this._filmListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _removeShowMoreButton() {
    this._showMoreButtonComponent.getElement().remove();
  }

  _handleShowMoreButtonClick() {
    this._films.slice(this._renderedFilmCount, this._renderedFilmCount + CARDS_COUNT_PER_STEP)
      .forEach((film) => this._renderFilmCard(film));

    this._renderedFilmCount += CARDS_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._films.length) {
      this._removeShowMoreButton();
    }
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._filmCardPresenters.get(updatedFilm.id).init(updatedFilm);
  }
}
