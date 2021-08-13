import AbstractView from './abstract.js';

const createFilmCardTemplate = (film) => {
  const {poster, title, rating, releaseDate, duration, genres, description, comments, isAddedToWatchList, isAlreadyWatched, isFavorite} = film;

  const getControlsItemActiveClassName = (isActive) => {
    if (isActive) {
      return 'film-card__controls-item--active';
    } else {
      return '';
    }
  };

  return`<article class="film-card">
     <!--click open-->
     <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
       <span class="film-card__year">${releaseDate.format('YYYY')}</span>
       <span class="film-card__duration">${duration.hours}h ${duration.minutes}m</span>
       <span class="film-card__genre">${genres[0]}</span>
      </p>
      <!--click open-->
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <!--click open-->
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
}
