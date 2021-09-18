import FilmCardView from '../view/film-card';
import FilmDetailsView from '../view/popup-view';
import {RenderPosition, renderElement, replaceElement, removeElement} from '../utils/render.js';
import {UpdateType, UserAction} from '../const.js';
import dayjs from 'dayjs';
import he from 'he';

export default class FilmCard {
  constructor(filmCardListContainer, mainContainer, bodyContainer, changeData, onPopupOpen, onPopupClose, api) {
    this._filmCardListContainer = filmCardListContainer;
    this._mainContainer = mainContainer;
    this._bodyContainer = bodyContainer;
    this._changeData = changeData;
    this._onPopupOpen = onPopupOpen;
    this._onPopupClose = onPopupClose;
    this._api = api;
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._comments = [];

    this._openFilmDetailPopup = this._openFilmDetailPopup.bind(this);
    this.closeFilmDetailPopup = this.closeFilmDetailPopup.bind(this);
    this._onAddToWatchClick = this._onAddToWatchClick.bind(this);
    this._onAlreadyWatchedClick = this._onAlreadyWatchedClick.bind(this);
    this._onFavoriteClick = this._onFavoriteClick.bind(this);
    this._onCommentDeleteCLick = this._onCommentDeleteCLick.bind(this);
    this._onSubmitCommentHandler = this._onSubmitCommentHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardView(film);
    this._initFilmDetailsComponent();

    this._filmCardComponent.setTitleClickHandler(this._openFilmDetailPopup);
    this._filmCardComponent.setPosterClickHandler(this._openFilmDetailPopup);
    this._filmCardComponent.setCommentsClickHandler(this._openFilmDetailPopup);
    this._filmCardComponent.setAddToWatchListClickHandler(this._onAddToWatchClick);
    this._filmCardComponent.setWatchedClickHandler(this._onAlreadyWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._onFavoriteClick);


    if (prevFilmCardComponent === null || prevFilmDetailsComponent === null) {
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

  _initFilmDetailsComponent() {
    this._filmDetailsComponent = new FilmDetailsView(this._film, this._comments);

    this._filmDetailsComponent.setClickHandler(this.closeFilmDetailPopup);
    this._filmDetailsComponent.setAddToWatchListClickHandler(this._onAddToWatchClick);
    this._filmDetailsComponent.setWatchedClickHandler(this._onAlreadyWatchedClick);
    this._filmDetailsComponent.setFavoriteClickHandler(this._onFavoriteClick);
    this._filmDetailsComponent.setDeleteCommentClickHandler(this._onCommentDeleteCLick);
    this._filmDetailsComponent.setAddCommentClickHandler(this._onSubmitCommentHandler);
  }

  destroy() {
    removeElement(this._filmCardComponent);
  }

  _openFilmDetailPopup() {
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._onPopupOpen();
    const show = (comments) => {
      this._comments = comments.slice();
      this._initFilmDetailsComponent();
      this._mainContainer.appendChild(this._filmDetailsComponent.getElement());
      this._bodyContainer.classList.toggle('hide-overflow');
    };
    this._api.getComments(this._film.id)
      .then((comments) => {
        show(comments);
      })
      .catch(() => {
        show(null);
      });
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._mainContainer.removeChild(this._filmDetailsComponent.getElement());
      this._bodyContainer.classList.toggle('hide-overflow');
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  closeFilmDetailPopup() {
    if (!this._mainContainer.contains(this._filmDetailsComponent.getElement())) {
      return;
    }
    this._onPopupClose();
    this._mainContainer.removeChild(this._filmDetailsComponent.getElement());
    this._bodyContainer.classList.toggle('hide-overflow');
  }

  _onAddToWatchClick() {
    const updateType = !this._film.isAddedToWatchList ? UpdateType.PATCH : UpdateType.MINOR;
    this._changeData(
      UserAction.UPDATE_FILM_CARD,
      updateType,
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
    const updateType = !this._film.isAlreadyWatched ? UpdateType.PATCH : UpdateType.MINOR;
    this._changeData(
      UserAction.UPDATE_FILM_CARD,
      updateType,
      Object.assign(
        {},
        this._film,
        {
          isAlreadyWatched: !this._film.isAlreadyWatched,
          watchingDate: !this._film.isAlreadyWatched ? dayjs() : null,
        },
      ),
    );
  }

  _onFavoriteClick() {
    const updateType = !this._film.isFavorite ? UpdateType.PATCH : UpdateType.MINOR;
    this._changeData(
      UserAction.UPDATE_FILM_CARD,
      updateType,
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite,
        },
      ),
    );
  }

  _onCommentDeleteCLick(id) {
    this._filmDetailsComponent.setCommentDeleting(id, true);
    this._api.deleteComment(id)
      .then(() => {
        this._comments = this._comments.filter((comment) => comment.id !== id);
        this._changeData(
          UserAction.DELETE_COMMENT,
          UpdateType.PATCH,
          Object.assign(
            {},
            this._film,
            {
              comments: this._film.comments.filter((commentId) => commentId !== id),
            },
          ));
      })
      .catch(() => {
        const afterShaking = () => {
          this._filmDetailsComponent.setCommentDeleting(id, false);
        };
        this._filmDetailsComponent.shakeCommentsSection(id, afterShaking);
      });
  }

  _onSubmitCommentHandler(selectedCommentEmotion, newCommentText) {
    if (this._mainContainer.contains(this._filmDetailsComponent.getElement())) {
      this._filmDetailsComponent.setAddingNewComment(true);
      this._api.addComment(this._film.id, {
        comment: he.escape(newCommentText),
        emotion: selectedCommentEmotion,
      }).then((filmAndComments) => {
        this._comments = filmAndComments.comments.slice();
        this._changeData(
          UserAction.ADD_COMMENT,
          UpdateType.PATCH,
          filmAndComments.film,
        );
      })
        .catch(() => {
          const afterShaking = () => {
            this._filmDetailsComponent.setAddingNewComment(false);
          };
          this._filmDetailsComponent.shake(afterShaking);
        });
    }
  }
}
