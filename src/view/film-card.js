import AbstractView from './abstract.js';
import dayjs from 'dayjs';

const createFilmCardTemplate = (film) => {
  const {poster, title, rating, releaseDate, duration, genres, description, comments, isAddedToWatchList, isAlreadyWatched, isFavorite} = film;

  const getControlsItemActiveClassName = (isActive) => {
    if (isActive) {
      return 'film-card__controls-item--active';
    } else {
      return '';
    }
  };

  const formatDuration = (filmDuration) => dayjs().startOf('day').add(filmDuration, 'minute').format('H[h] mm[m]');

  return`<article class="film-card">
     <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
       <span class="film-card__year">${releaseDate.format('YYYY').toString()}</span>
       <span class="film-card__duration">${formatDuration(duration)}</span>
       <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${getControlsItemActiveClassName(isAddedToWatchList)}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${getControlsItemActiveClassName(isAlreadyWatched)}" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${getControlsItemActiveClassName(isFavorite)}" type="button">Mark as favorite</button>
       </div>
  </article>`;
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._titleClickHandler = this._titleClickHandler.bind(this);
    this._posterClickHandler = this._posterClickHandler.bind(this);
    this._commentsClickHandler = this._commentsClickHandler.bind(this);

    this._addToWatchListClickHandler = this._addToWatchListClickHandler.bind(this);
    this._alreadyWatchedClickHandler = this._alreadyWatchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _titleClickHandler(evt) {
    evt.preventDefault();
    this._callback.titleClick();
  }

  setTitleClickHandler(callback) {
    this._callback.titleClick = callback;
    this.getElement().querySelector('.film-card__title')
      .addEventListener('click', this._titleClickHandler);
  }

  _posterClickHandler(evt) {
    evt.preventDefault();
    this._callback.posterClick();
  }

  setPosterClickHandler(callback) {
    this._callback.posterClick = callback;
    this.getElement().querySelector('.film-card__poster')
      .addEventListener('click', this._posterClickHandler);
  }

  _commentsClickHandler(evt) {
    evt.preventDefault();
    this._callback.commentsClick();
  }

  setCommentsClickHandler(callback) {
    this._callback.commentsClick = callback;
    this.getElement().querySelector('.film-card__comments')
      .addEventListener('click', this._commentsClickHandler);
  }

  _addToWatchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatchButtonClick();
  }

  setAddToWatchListClickHandler(callback) {
    this._callback.addToWatchButtonClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this._addToWatchListClickHandler);
  }

  _alreadyWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedButtonClick();
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedButtonClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this._alreadyWatchedClickHandler);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteButtonClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteButtonClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this._favoriteClickHandler);
  }
}
