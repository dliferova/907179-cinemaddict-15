import FilmCardView from '../view/film-card';
import FilmDetailsView from '../view/popup-view';
import {RenderPosition, renderElement, replaceElement, removeElement} from '../utils/render.js';

export default class FilmCard {
  constructor(filmCardListContainer, mainContainer, bodyContainer, changeData) {
    this._filmCardListContainer = filmCardListContainer;
    this._mainContainer = mainContainer;
    this._bodyContainer = bodyContainer;
    this._changeData = changeData;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._openFilmDetailPopup = this._openFilmDetailPopup.bind(this);
    this._closeFilmDetailPopup = this._closeFilmDetailPopup.bind(this);
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
    this._filmDetailsComponent.setClickHandler(this._closeFilmDetailPopup);

    if (prevFilmCardComponent === null ||  prevFilmDetailsComponent === null) {
      renderElement(this._filmCardListContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmCardListContainer.contains(prevFilmCardComponent.getElement())) {
      replaceElement(prevFilmCardComponent, this._filmCardComponent);
    }

    removeElement(prevFilmCardComponent);
  }

  _openFilmDetailPopup() {
    this._mainContainer.appendChild(this._filmDetailsComponent.getElement());
    this._bodyContainer.classList.toggle('hide-overflow');
  }

  _closeFilmDetailPopup() {
    this._mainContainer.removeChild(this._filmDetailsComponent.getElement());
    this._bodyContainer.classList.toggle('hide-overflow');
  }

  _onAddToWatchClick() {
    console.log(`Film ${this._film.id} onAddToWatchClick clicked!`);

    this._changeData(
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
    console.log(`Film ${this._film.id} onAlreadyWatched clicked!`);

    this._changeData(
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
    console.log(`Film ${this._film.id} onFavorite clicked!`);

    this._changeData(
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
