import FilmCardView from '../view/film-card';
import FilmDetailsView from '../view/popup-view';
import {RenderPosition, renderElement, replaceElement, removeElement} from '../utils/render.js';
import {UpdateType, UserAction} from '../const.js';

export default class FilmCard {
  constructor(filmCardListContainer, mainContainer, bodyContainer, changeData, onPopupOpen, onPopupClose) {
    this._filmCardListContainer = filmCardListContainer;
    this._mainContainer = mainContainer;
    this._bodyContainer = bodyContainer;
    this._changeData = changeData;
    this._onPopupOpen = onPopupOpen;
    this._onPopupClose = onPopupClose;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._openFilmDetailPopup = this._openFilmDetailPopup.bind(this);
    this.closeFilmDetailPopup = this.closeFilmDetailPopup.bind(this);
    this._onAddToWatchClick = this._onAddToWatchClick.bind(this);
    this._onAlreadyWatchedClick = this._onAlreadyWatchedClick.bind(this);
    this._onFavoriteClick = this._onFavoriteClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardView(film);
    this._filmDetailsComponent = new FilmDetailsView(film);

    this._filmCardComponent.setTitleClickHandler(this._openFilmDetailPopup);
    this._filmCardComponent.setPosterClickHandler(this._openFilmDetailPopup);
    this._filmCardComponent.setCommentsClickHandler(this._openFilmDetailPopup);
    this._filmCardComponent.setAddToWatchListClickHandler(this._onAddToWatchClick);
    this._filmCardComponent.setWatchedClickHandler(this._onAlreadyWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._onFavoriteClick);
    this._filmDetailsComponent.setClickHandler(this.closeFilmDetailPopup);

    this._filmDetailsComponent.setAddToWatchListClickHandler(this._onAddToWatchClick);
    this._filmDetailsComponent.setWatchedClickHandler(this._onAlreadyWatchedClick);
    this._filmDetailsComponent.setFavoriteClickHandler(this._onFavoriteClick);

    if (prevFilmCardComponent === null ||  prevFilmDetailsComponent === null) {
      renderElement(this._filmCardListContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmCardListContainer.contains(prevFilmCardComponent.getElement())) {
      replaceElement(prevFilmCardComponent, this._filmCardComponent);
    }

    if (this._mainContainer.contains(prevFilmDetailsComponent.getElement())) {
      replaceElement(prevFilmDetailsComponent, this._filmDetailsComponent);
    }

    removeElement(prevFilmCardComponent);
  }

  _openFilmDetailPopup() {
    this._onPopupOpen();
    this._mainContainer.appendChild(this._filmDetailsComponent.getElement());
    this._bodyContainer.classList.toggle('hide-overflow');
  }

  closeFilmDetailPopup() {
    this._onPopupClose();
    this._mainContainer.removeChild(this._filmDetailsComponent.getElement());
    this._bodyContainer.classList.toggle('hide-overflow');
  }

  _onAddToWatchClick() {
    this._changeData(
      UserAction.UPDATE_FILM_CARD,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          isAddedToWatchList: !this._film.isAddedToWatchList,
        },
      ),
    );
  }

  _onAlreadyWatchedClick() {
    this._changeData(
      UserAction.UPDATE_FILM_CARD,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          isAlreadyWatched: !this._film.isAlreadyWatched,
        },
      ),
    );
  }

  _onFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_FILM_CARD,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite,
        },
      ),
    );
  }
}
