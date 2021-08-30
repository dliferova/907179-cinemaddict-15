import {RenderPosition, renderElement} from '../utils/render.js';
import FilmListView from '../view/films-list.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import FilmCardPresenter from './film-card-presenter.js';
import {updateItem} from '../utils/common.js';

const EXTRA_CARDS_COUNT = 2;
const CARDS_COUNT_PER_STEP = 5;

export default class FilmCardList {
  constructor(filmsContainer, mainContainer, bodyContainer, filmsModel) {
    this._filmsContainer = filmsContainer;
    this._mainContainer = mainContainer;
    this._bodyContainer = bodyContainer;
    this._filmsModel = filmsModel;
    this._renderedFilmCount = CARDS_COUNT_PER_STEP;
    this._filmCardPresenters = new Map();
    this._openedPopupId = null;

    this._handleFilmChange = this._handleFilmChange.bind(this);

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(title, isExtra) {
    this._title = title;
    this._isExtra = isExtra;

    this._filmListComponent = new FilmListView(title, isExtra);
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._renderFilmList();
  }

  _getFilms() {
    if (this._isExtra) {
      return this._filmsModel.getFilms().slice(0, EXTRA_CARDS_COUNT);
    } else {
      return this._filmsModel.getFilms();
    }
  }

  _renderFilmList() {
    renderElement(this._filmsContainer, this._filmListComponent, RenderPosition.BEFOREEND);

    for (let i = 0; i < Math.min(this._getFilms().length, CARDS_COUNT_PER_STEP); i++) {
      this._renderFilmCard(this._getFilms()[i]);
    }

    if (!this._isExtra) {
      if (this._getFilms.length > CARDS_COUNT_PER_STEP) {
        this._renderedFilmCount = CARDS_COUNT_PER_STEP;
        this._renderShowMoreButton();
      }
    }
  }

  _renderFilmCard(film) {
    const container = this._filmListComponent.getFilmsContainer();
    const filmCardPresenter = new FilmCardPresenter(container, this._mainContainer, this._bodyContainer, this._handleFilmChange, () => this._handleOpenPopup(film.id), () => this._handleClosePopup());
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
    this._getFilms().slice(this._renderedFilmCount, this._renderedFilmCount + CARDS_COUNT_PER_STEP)
      .forEach((film) => this._renderFilmCard(film));

    this._renderedFilmCount += CARDS_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._getFilms().length) {
      this._removeShowMoreButton();
    }
  }

  _handleFilmChange(updatedFilm) {
    const updatedFilms = updateItem(this._getFilms(), updatedFilm);
    this._filmsModel.setFilms(updatedFilms);
    this._filmCardPresenters.get(updatedFilm.id).init(updatedFilm);
  }

  _handleOpenPopup(id) {
    if (this._openedPopupId !== null) {
      this._filmCardPresenters.get(this._openedPopupId).closeFilmDetailPopup();
    }
    this._openedPopupId = id;
  }

  _handleClosePopup() {
    this._openedPopupId = null;
  }
}
