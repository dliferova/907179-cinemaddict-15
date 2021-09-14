import {RenderPosition, renderElement, removeElement} from '../utils/render.js';
import FilmsSectionView from '../view/films-section.js';
import FilmListView from '../view/films-list.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import FilmCardPresenter, {State as FilmCardPresenterViewState} from './film-card-presenter.js';
import {UpdateType, UserAction, SortType, FilterType} from '../const.js';
import {filter} from '../utils/filter.js';
import EmptyListView from '../view/film-list-empty.js';
import SortView from '../view/sort-view.js';
import {sortByDate, sortByRating} from '../utils/sort.js';
import LoadingView from '../view/loading.js';

const EXTRA_CARDS_COUNT = 2;
const CARDS_COUNT_PER_STEP = 5;
const LIST_TITLE = 'All movies. Upcoming';
const TOP_RATED_LIST_TITLE = 'Top rated';
const MOST_COMMENTED_LIST_TITLE = 'Most commented';

export default class FilmCardList {
  constructor(mainContainer, bodyContainer, filmsModel, filterModel, api) {
    this._mainContainer = mainContainer;
    this._bodyContainer = bodyContainer;
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;

    this._isLoading = true;
    this._api = api;
    this._loadingComponent = new LoadingView();

    this._openedPopupId = null;
    this._showMoreButtonComponent = null;

    this._filmsSectionComponent = new FilmsSectionView();
    this._filmListComponent = new FilmListView(LIST_TITLE, false);
    this._topRatedListComponent = new FilmListView(TOP_RATED_LIST_TITLE, true);
    this._mostCommentedListComponent = new FilmListView(MOST_COMMENTED_LIST_TITLE, true);
    this._emptyListComponent = new EmptyListView();
    this._sortComponent = new SortView();

    this._filmCardPresenters = new Map();
    this._topRatedListPresenters = new Map();
    this._mostCommentedListPresenters = new Map();

    this._renderedFilmCount = CARDS_COUNT_PER_STEP;

    this._filterType = FilterType.ALL;
    this._currentSortType = SortType.SORT_BY_DEFAULT;

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
  }

  destroy() {
    this._clearFilmList({resetRenderFilmCount: true, resetSortType: true});

    removeElement(this._sortComponent);
    removeElement(this._filmsSectionComponent);

    this._filmsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  init() {
    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._renderFilms();
  }

  _getFilms() {
    this._filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filteredFilms = filter[this._filterType](films);

    switch (this._currentSortType) {
      case SortType.SORT_BY_DATE:
        sortByDate(filteredFilms);
        break;
      case SortType.SORT_BY_RATING:
        sortByRating(filteredFilms);
        break;
    }

    return filteredFilms;
  }

  _renderFilmList() {
    renderElement(this._mainContainer, this._filmsSectionComponent, RenderPosition.BEFOREEND);
    renderElement(this._filmsSectionComponent, this._filmListComponent, RenderPosition.BEFOREEND);
    const container = this._filmListComponent.getFilmsContainer();

    for (let i = 0; i < Math.min(this._getFilms().length, this._renderedFilmCount); i++) {
      this._renderFilmCard(this._getFilms()[i], container, this._filmCardPresenters);
    }

    if (this._getFilms().length > this._renderedFilmCount) {
      this._renderShowMoreButton();
    }
  }

  _renderFilmCard(film, container, presenters) {
    const filmCardPresenter = new FilmCardPresenter(container, this._mainContainer, this._bodyContainer, this._handleViewAction, () => this._handleOpenPopup(film.id), () => this._handleClosePopup(), this._api);
    filmCardPresenter.init(film);
    presenters.set(film.id, filmCardPresenter);
  }

  _renderShowMoreButton() {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
    renderElement(this._filmListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  _renderEmptyFilteredList() {
    removeElement(this._sortComponent);
    removeElement(this._filmListComponent);
    removeElement(this._topRatedListComponent);
    removeElement(this._mostCommentedListComponent);

    this._emptyListComponent = new EmptyListView(this._filterType);
    renderElement(this._filmsSectionComponent, this._emptyListComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + CARDS_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);
    const container = this._filmListComponent.getFilmsContainer();

    films.forEach((film) => this._renderFilmCard(film, container, this._filmCardPresenters));
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      removeElement(this._showMoreButtonComponent);
    }
  }

  _initFilmPopup(presenters, popupId) {
    if (presenters.has(popupId)) {
      presenters.get(popupId).closeFilmDetailPopup();
    }
  }

  _handleOpenPopup(id) {
    const openedPopupId = this._openedPopupId;
    if (openedPopupId !== null) {
      this._initFilmPopup(this._filmCardPresenters, openedPopupId);
      this._initFilmPopup(this._topRatedListPresenters, openedPopupId);
      this._initFilmPopup(this._mostCommentedListPresenters, openedPopupId);
    }
    this._openedPopupId = id;
  }

  _handleClosePopup() {
    this._openedPopupId = null;
  }


  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM_CARD:
        this._api.updateFilm(update)
          .then((response) => {
            this._filmsModel.updateFilm(updateType, response);
          });
        break;
      case UserAction.ADD_COMMENT:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        // this._filmCardPresenters.get(update.id).setViewState(FilmCardPresenterViewState.DELETING);
        this._filmsModel.updateFilm(updateType, update);
        break;
    }
  }

  _initFilmCardPresenters(presenters, data) {
    if (presenters.has(data.id)) {
      presenters.get(data.id).init(data);
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._initFilmCardPresenters(this._filmCardPresenters, data);
        this._initFilmCardPresenters(this._topRatedListPresenters, data);
        this._initFilmCardPresenters(this._mostCommentedListPresenters, data);
        break;
      case UpdateType.MINOR:
        this._clearFilmList();
        this._renderFilms();
        break;
      case UpdateType.MAJOR:
        this._clearFilmList({resetRenderFilmCount: true, resetSortType: true});
        this._renderFilms();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        removeElement(this._loadingComponent);
        this._renderFilms();
        break;
    }
  }

  _clearMapPresenter(mapPresenter) {
    mapPresenter.forEach((presenter) => presenter.destroy());
    mapPresenter.clear();
  }

  _clearFilmList({resetRenderFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    this._clearMapPresenter(this._filmCardPresenters);
    this._clearMapPresenter(this._topRatedListPresenters);
    this._clearMapPresenter(this._mostCommentedListPresenters);

    removeElement(this._showMoreButtonComponent);
    removeElement(this._loadingComponent);

    if (this._emptyListComponent) {
      removeElement(this._emptyListComponent);
    }

    if (resetRenderFilmCount) {
      this._renderedFilmCount = CARDS_COUNT_PER_STEP;
    } else {
      this._renderedFilmCount = Math.min(filmCount, this._renderedFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.SORT_BY_DEFAULT;
    }
  }

  _renderFilms() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const filmCount = this._getFilms().length;

    if (!filmCount) {
      this._renderEmptyFilteredList();
      return;
    }

    this._renderSort();
    this._renderFilmList();
    this._renderTopRatedFilmList();
    this._renderMostCommentedFilmList();
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearFilmList();
    this._renderFilms();
  }

  _renderSort() {
    if (!this._mainContainer.contains(this._sortComponent.getElement())) {
      renderElement(this._mainContainer, this._sortComponent, RenderPosition.BEFOREEND);
      this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    }
  }

  _renderTopRatedFilmList() {
    renderElement(this._filmsSectionComponent, this._topRatedListComponent, RenderPosition.BEFOREEND);
    const container = this._topRatedListComponent.getFilmsContainer();
    this._getFilms().slice(0, EXTRA_CARDS_COUNT)
      .forEach((film) => {
        this._renderFilmCard(film, container, this._topRatedListPresenters);
      });
  }

  _renderMostCommentedFilmList() {
    renderElement(this._filmsSectionComponent, this._mostCommentedListComponent, RenderPosition.BEFOREEND);
    const container = this._mostCommentedListComponent.getFilmsContainer();
    this._getFilms().slice(0, EXTRA_CARDS_COUNT)
      .forEach((film) => {
        this._renderFilmCard(film, container, this._mostCommentedListPresenters);
      });
  }

  _renderLoading() {
    renderElement(this._mainContainer, this._loadingComponent, RenderPosition.BEFOREEND);
  }
}
