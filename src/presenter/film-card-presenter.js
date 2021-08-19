import FilmCardView from '../view/film-card';
import FilmDetailsView from '../view/popup-view';
import {RenderPosition, renderElement} from '../utils/render.js';

export default class FilmCard {
  constructor(filmCardListContainer, mainContainer, bodyContainer) {
    this._filmCardListContainer = filmCardListContainer;
    this._mainContainer = mainContainer;
    this._bodyContainer = bodyContainer;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._openFilmDetailPopup = this._openFilmDetailPopup.bind(this);
    this._closeFilmDetailPopup = this._closeFilmDetailPopup.bind(this);
  }

  init(film) {
    this._film = film;

    this._filmCardComponent = new FilmCardView(film);
    this._filmDetailsComponent = new FilmDetailsView(film);

    this._renderFilm();
  }

  _openFilmDetailPopup() {
    this._mainContainer.appendChild(this._filmDetailsComponent.getElement());
    this._bodyContainer.classList.toggle('hide-overflow');
  }

  _closeFilmDetailPopup() {
    this._mainContainer.removeChild(this._filmDetailsComponent.getElement());
    this._bodyContainer.classList.toggle('hide-overflow');
  }

  _renderFilm() {
    renderElement(this._filmCardListContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
    this._filmCardComponent.setTitleClickHandler(this._openFilmDetailPopup);
    this._filmCardComponent.setPosterClickHandler(this._openFilmDetailPopup);
    this._filmCardComponent.setCommentsClickHandler(this._openFilmDetailPopup);
    this._filmDetailsComponent.setClickHandler(this._closeFilmDetailPopup);
  }
}
