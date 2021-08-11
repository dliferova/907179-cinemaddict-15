import AbstractView from './abstract.js';

export const createCommentElement = (comment) => {
  const {emotions, textComment, author, date} = comment;

  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotions}" width="55" height="55" alt="emoji-puke">
    </span>
    <div>
    <p class="film-details__comment-text">${textComment}</p>
    <p class="film-details__comment-info">
    <span class="film-details__comment-author">${author}</span>
    <span class="film-details__comment-day">${date.fromNow()}</span>
    <button class="film-details__comment-delete">Delete</button>
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
