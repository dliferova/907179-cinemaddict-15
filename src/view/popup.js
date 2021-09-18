import SmartView from './smart.js';
import {createCommentElement} from './comment.js';
import dayjs from 'dayjs';

const SHAKE_ANIMATION_TIMEOUT = 600;

const getFilmDetailsPopupTemplate = (data) => {
  const {
    poster,
    title,
    alternativeTitle,
    rating,
    ageRestriction,
    director,
    screenwriters,
    cast,
    releaseDate,
    duration,
    releaseCountry,
    genres,
    description,
    comments,
    isAddedToWatchList,
    isAlreadyWatched,
    isFavorite,
    selectedCommentEmotion,
    isAdding,
  } = data;

  const renderComments = (array) => {
    if (array === null) {
      return '';
    }
    let resultString = '';
    for (let i = 0; i < array.length; i++) {
      resultString = resultString + createCommentElement(array[i]);
    }
    return resultString;
  };
  const renderGenres = (array) => {
    let resultString = '';
    for (let i = 0; i < array.length; i++) {
      const template = `<span class="film-details__genre">${array[i]}</span>`;
      resultString = resultString + template;
    }
    return resultString;
  };

  const formatDuration = (filmDuration) => dayjs().startOf('day').add(filmDuration, 'minute').format('H[h] mm[m]');

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">
          <p class="film-details__age">${ageRestriction}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>
          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${screenwriters.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${cast.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${releaseDate.format('DD MMMM YYYY')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${formatDuration(duration)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${releaseCountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genres.length > 1 ? 'Genres' : 'Genre'}</td>
              <td class="film-details__cell">${renderGenres(genres)}</td>
            </tr>
          </table>

          <p class="film-details__film-description">${description}</p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist ${isAddedToWatchList ? 'film-details__control-button--active' : ''}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button film-details__control-button--watched ${isAlreadyWatched ? 'film-details__control-button--active' : ''}" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite ${isFavorite ? 'film-details__control-button--active' : ''}" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments !== null ? comments.length : 'not loaded'}</span></h3>

        <ul class="film-details__comments-list">
          ${renderComments(comments)}
        </ul>
        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">
            ${selectedCommentEmotion ? `<img src="images/emoji/${selectedCommentEmotion}.png" width="55" height="55" alt="emoji-${selectedCommentEmotion}">` : ''}
          </div>
          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="${isAdding ? 'Sending...' : 'Select reaction below and write comment here'}" name="comment" ${isAdding ? 'disabled' : ''}></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" ${isAdding ? 'disabled' : ''} id="emoji-smile" value="smile" ${selectedCommentEmotion === 'smile' ? 'checked' : ''}>
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" ${isAdding ? 'disabled' : ''} id="emoji-sleeping" value="sleeping" ${selectedCommentEmotion === 'sleeping' ? 'checked' : ''}>
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" ${isAdding ? 'disabled' : ''} id="emoji-puke" value="puke" ${selectedCommentEmotion === 'puke' ? 'checked' : ''}>
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" ${isAdding ? 'disabled' : ''} id="emoji-angry" value="angry" ${selectedCommentEmotion === 'angry' ? 'checked' : ''}>
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class FilmDetails extends SmartView {
  constructor(film, comments) {
    super();
    this._data = FilmDetails.parseToData(film, comments);
    this._clickHandler = this._clickHandler.bind(this);
    this._addToWatchListClickHandler = this._addToWatchListClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._emotionsChangeHandler = this._emotionsChangeHandler.bind(this);
    this._deleteCommentClickHandler = this._deleteCommentClickHandler.bind(this);
    this._addCommentClickHandler = this._addCommentClickHandler.bind(this);
    this._setInnerHandlers();
    this._checkedEmotion = null;
  }

  getTemplate() {
    return getFilmDetailsPopupTemplate(this._data);
  }

  restoreHandlers() {
    this.setClickHandler(this._callback.click);
    this.setAddToWatchListClickHandler(this._callback.addToWatchButtonClick);
    this.setWatchedClickHandler(this._callback.watchedButtonCLick);
    this.setFavoriteClickHandler(this._callback.favoriteButtonClick);
    this.setDeleteCommentClickHandler(this._callback.deleteCommentButtonClick);
    this.setAddCommentClickHandler(this._callback.addNewCommentButtonClick);
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.film-details__emoji-list')
      .addEventListener('change', this._emotionsChangeHandler);
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

  _onEmotionChange(emotion) {
    this.updateData({
      selectedCommentEmotion: emotion,
    });
  }

  _emotionsChangeHandler(evt) {
    if (evt.target.matches('input[type="radio"]')) {
      this._onEmotionChange(evt.target.value);
    }
  }

  _deleteCommentClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteCommentButtonClick(evt.target.dataset.id);
  }

  setDeleteCommentClickHandler(callback) {
    this._callback.deleteCommentButtonClick = callback;
    this.getElement().querySelectorAll('.film-details__comment-delete')
      .forEach((comment) => comment.addEventListener('click', this._deleteCommentClickHandler));
  }

  _addCommentClickHandler(evt) {
    if (evt.key === 'Enter' && evt.ctrlKey && !this._data.isAdding) {
      evt.preventDefault();
      const newCommentText = this.getElement().querySelector('.film-details__comment-input').value;
      this._callback.addNewCommentButtonClick(this._data.selectedCommentEmotion, newCommentText);
    }
  }

  setAddCommentClickHandler(callback) {
    this._callback.addNewCommentButtonClick = callback;
    this.getElement().addEventListener('keydown', this._addCommentClickHandler);
  }

  setCommentDeleting(id, isDeleting) {
    this.updateData({
      comments: this._data.comments.map((comment) => {
        if (comment.id === id) {
          comment.isDeleting = isDeleting;
        }
        return comment;
      }),
    });
  }

  setAddingNewComment(addingStatus) {
    this.updateData(
      {
        isAdding: addingStatus,
      },
    );
  }

  shakeCommentsSection(commentId, callback) {
    const commentElement = this.getElement().querySelector(`li[data-id="${commentId}"]`);
    commentElement.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      commentElement.style.animation = '';
      callback();
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  static parseToData(film, comments) {
    return Object.assign(
      {},
      film,
      {
        selectedCommentEmotion: null,
        isAdding: false,
        comments: comments.map((comment) => Object.assign(
          {},
          comment,
          {
            isDeleting: false,
          },
        )),
      },
    );
  }
}
