import AbstractView from './abstract.js';

export const createCommentElement = (comment) => {
  const {emotion, commentMessage, author, date, id, isDeleting} = comment;

  console.log(id, isDeleting);

  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
    </span>
    <div>
        <p class="film-details__comment-text">${commentMessage}</p>
        <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${date.fromNow()}</span>
            <button class="film-details__comment-delete" data-id="${id}" ${isDeleting ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
        </p>
    </div>
    </li>`;
};

export default class CommentView extends AbstractView {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() {
    return createCommentElement(this._comment);
  }
}
