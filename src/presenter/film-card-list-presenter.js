import {RenderPosition, renderElement, removeElement} from '../utils/render.js';
import FilmsSectionView from '../view/films-section.js';
import FilmListView from '../view/films-list.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import FilmCardPresenter from './film-card-presenter.js';
import {UpdateType, UserAction, SortType, FilterType} from '../const.js';
import {filter} from '../utils/filter.js';

const EXTRA_CARDS_COUNT = 2;
const CARDS_COUNT_PER_STEP = 5;
const LIST_TITLE = 'All movies. Upcoming';
const TOP_RATED_LIST_TITLE = 'Top rated';
const MOST_COMMENTED_LIST_TITLE = 'Most commented';

export default class FilmCardList {
  constructor(mainContainer, bodyContainer, filmsModel, filterModel) {
    this._mainContainer = mainContainer;
    this._bodyContainer = bodyContainer;
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;

    this._filmsSectionComponent = new FilmsSectionView();
    this._filmListComponent = new FilmListView(LIST_TITLE, false);
    this._topRatedListComponent = new FilmListView(TOP_RATED_LIST_TITLE, true);
    this._mostCommentedListComponent = new FilmListView(MOST_COMMENTED_LIST_TITLE, true);

    this._filmCardPresenters = new Map();
    this._topRatedListPresenters = new Map();
    this._mostCommentedListPresenters = new Map();

    this._renderedFilmCount = CARDS_COUNT_PER_STEP;
    this._showMoreButtonComponent = null;

    this._filterType = FilterType.ALL;
    this._currentSortType = SortType.SORT_BY_DEFAULT;

    this._openedPopupId = null;
    // this._sortComponent = null;

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    // this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  // TODO 2. отрефакторить, убрать лишнее
  init() {
    this._renderFilmList();
    this._renderTopRatedFilmList();
    this._renderMostCommentedFilmList();
  }

  _getFilms() {
    return this._filmsModel.getFilms();
  }

  _renderFilmList() {
    renderElement(this._mainContainer, this._filmsSectionComponent, RenderPosition.BEFOREEND);
    renderElement(this._filmsSectionComponent, this._filmListComponent, RenderPosition.BEFOREEND);
    const container = this._filmListComponent.getFilmsContainer();

    for (let i = 0; i < Math.min(this._getFilms().length, CARDS_COUNT_PER_STEP); i++) {
      this._renderFilmCard(this._getFilms()[i], container, this._filmCardPresenters);
    }

    if (this._getFilms().length > CARDS_COUNT_PER_STEP) {
      this._renderedFilmCount = CARDS_COUNT_PER_STEP;
      this._renderShowMoreButton();
    }
  }

  _renderFilmCard(film, container, presenters) {
    const filmCardPresenter = new FilmCardPresenter(container, this._mainContainer, this._bodyContainer, this._handleViewAction, () => this._handleOpenPopup(film.id), () => this._handleClosePopup());
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

  _removeShowMoreButton() {
    this._showMoreButtonComponent.getElement().remove();
  }

  _handleShowMoreButtonClick() {
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + CARDS_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);
    const container = this._filmListComponent.getFilmsContainer();

    films.forEach((film) => this._renderFilmCard(film, container, this._filmCardPresenters));
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      this._removeShowMoreButton();
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
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_FILM_CARD:
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
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UpdateType.PATCH:
        //обновить часть списка
        this._initFilmCardPresenters(this._filmCardPresenters, data);
        this._initFilmCardPresenters(this._topRatedListPresenters, data);
        this._initFilmCardPresenters(this._mostCommentedListPresenters, data);
        break;
      case UpdateType.MINOR:
        //обновить список
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  }

  // TODO перенести сортировку из main.js
  // _handleSortTypeChange(sortType) {
  //   if (this._currentSortType === sortType) {
  //     return;
  //   }
  //
  //   this._currentSortType = sortType;
  // }

  // _renderSort() {
  //   if (this._sortComponent !==null) {
  //     this._sortComponent = null;
  //   }
  //
  //   this._sortComponent = new SortView(this._currentSortType);
  //   this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  //
  //   renderElement(this._mainContainer, this._sortComponent, RenderPosition.BEFOREEND);
  // }

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
}
