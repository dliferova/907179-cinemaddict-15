import AbstractView from './abstract.js';
import {createCommentElement} from './comment-view.js';

const renderComments = (comments) => {
  let resultString = '';
  for (let i = 0; i < comments.length; i++) {
    resultString = resultString + createCommentElement(comments[i]);
  }
  return resultString;
};

const renderGenres = (genres) => {
  let resultString = '';
  for (let i = 0; i < genres.length; i++) {
    const template = `<span class="film-details__genre">${genres[i]}</span>`;
    resultString = resultString + template;
  }
  return resultString;
};

const showFilmDetails = (film) => {
  const {poster, title, rating, ageRestriction, director, screenwriters, cast, releaseDate, duration, country, genres, description, comments, isAddedToWatchList, isAlreadyWatched, isFavorite} = film;

  const getControlsItemActiveClassName = (isActive) => {
    if (isActive) {
      return 'film-details__control-button--active';
    } else {
      return '';
    }
  };

  const filmDetailsPoster = () => `<div class="film-details__poster">
    <img class="film-details__poster-img" src="${poster}" alt="">
    <p class="film-details__age">${ageRestriction}</p>
  </div>`;

  const filmDetailsTable = () => `<table class="film-details__table">
    <tr class="film-details__row">
        <td class="film-details__term">Director</td>
        <td class="film-details__cell">${director}</td>
    </tr>
    <tr class="film-details__row">
        <td class="film-details__term">Writers</td>
        <td class="film-details__cell">${screenwriters}</td>
    </tr>
    <tr class="film-details__row">
        <td class="film-details__term">Actors</td>
        <td class="film-details__cell">${cast}</td>
    </tr>
    <tr class="film-details__row">
        <td class="film-details__term">Release Date</td>
        <td class="film-details__cell">${releaseDate.format('D MMMM YYYY')}</td>
    </tr>
    <tr class="film-details__row">
        <td class="film-details__term">Runtime</td>
        <td class="film-details__cell">${duration.hours}h ${duration.minutes}m</td>
    </tr>
    <tr class="film-details__row">
        <td class="film-details__term">Country</td>
        <td class="film-details__cell">${country}</td>
    </tr>
    <tr class="film-details__row">
        <td class="film-details__term">Genres</td>
        <td class="film-details__cell">
            ${renderGenres(genres)}
        </td>
    </tr>
</table>`;

  const filmDetailsBottomContainer = () => `<div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
          ${renderComments(comments)}
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>`;

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
         <!--      click close-->
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">

        ${filmDetailsPoster()}

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

            ${filmDetailsTable()}

          <p class="film-details__film-description">${description}</p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist ${getControlsItemActiveClassName(isAddedToWatchList)}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button film-details__control-button--watched ${getControlsItemActiveClassName(isAlreadyWatched)}" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite ${getControlsItemActiveClassName(isFavorite)}" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    ${filmDetailsBottomContainer()}

  </form>
</section>`;
};

export default class FilmDetails extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._clickHandler = this._clickHandler.bind(this);
    this._addToWatchListClickHandler = this._addToWatchListClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return showFilmDetails(this._film);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.film-details__close-btn')
      .addEventListener('click', this._clickHandler);
  }

  _addToWatchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatchButtonClick();
  }

  setAddToWatchListClickHandler(callback) {
    this._callback.addToWatchButtonClick = callback;
    this.getElement().querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this._addToWatchListClickHandler);
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedButtonCLick();
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedButtonCLick = callback;
    this.getElement().querySelector('.film-details__control-button--watched')
      .addEventListener('click', this._watchedClickHandler);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteButtonClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteButtonClick = callback;
    this.getElement().querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this._favoriteClickHandler);
  }
}
