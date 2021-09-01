import {RenderPosition, renderElement} from '../utils/render.js';
import FilmListView from '../view/films-list.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import FilmCardPresenter from './film-card-presenter.js';
import {UpdateType, UserAction, SortType} from '../const.js';

const EXTRA_CARDS_COUNT = 2;
const CARDS_COUNT_PER_STEP = 5;

export default class FilmCardList {
  constructor(filmsContainer, mainContainer, bodyContainer, filmsModel) {
    this._filmsContainer = filmsContainer;
    this._mainContainer = mainContainer;
    this._bodyContainer = bodyContainer;
    this._filmsModel = filmsModel;
    this._renderedFilmCount = CARDS_COUNT_PER_STEP;
    this._filmCardPresenters = new Map();
    this._currentSortType = SortType.SORT_BY_DEFAULT;

    this._openedPopupId = null;
    this._sortComponent = null;

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init(title, isExtra) {
    this._title = title;
    this._isExtra = isExtra;

    this._filmListComponent = new FilmListView(title, isExtra);
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._renderFilmList();
  }

  _getFilms() {
    if (this._isExtra) {
      return this._filmsModel.getFilms().slice(0, EXTRA_CARDS_COUNT);
    } else {
      return this._filmsModel.getFilms();
    }
  }

  _renderFilmList() {
    renderElement(this._filmsContainer, this._filmListComponent, RenderPosition.BEFOREEND);

    for (let i = 0; i < Math.min(this._getFilms().length, CARDS_COUNT_PER_STEP); i++) {
      this._renderFilmCard(this._getFilms()[i]);
    }

    if (!this._isExtra) {
      if (this._getFilms().length > CARDS_COUNT_PER_STEP) {
        this._renderedFilmCount = CARDS_COUNT_PER_STEP;
        this._renderShowMoreButton();
      }
    }
  }

  _renderFilmCard(film) {
    const container = this._filmListComponent.getFilmsContainer();
    const filmCardPresenter = new FilmCardPresenter(container, this._mainContainer, this._bodyContainer, this._handleViewAction, () => this._handleOpenPopup(film.id), () => this._handleClosePopup());
    filmCardPresenter.init(film);
    this._filmCardPresenters.set(film.id, filmCardPresenter);
  }

  _renderShowMoreButton() {
    renderElement(this._filmListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _removeShowMoreButton() {
    this._showMoreButtonComponent.getElement().remove();
  }

  _handleShowMoreButtonClick() {
    this._getFilms().slice(this._renderedFilmCount, this._renderedFilmCount + CARDS_COUNT_PER_STEP)
      .forEach((film) => this._renderFilmCard(film));

    this._renderedFilmCount += CARDS_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._getFilms().length) {
      this._removeShowMoreButton();
    }
  }

  //_handleTaskChange заменим на обработчик любого пользовательского действия (пока пустой)

  // _handleFilmChange(updatedFilm) {
  //   const updatedFilms = updateItem(this._getFilms(), updatedFilm);
  //   this._filmsModel.setFilms(updatedFilms);
  //   this._filmCardPresenters.get(updatedFilm.id).init(updatedFilm);
  // }

  _handleOpenPopup(id) {
    if (this._openedPopupId !== null) {
      this._filmCardPresenters.get(this._openedPopupId).closeFilmDetailPopup();
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

  //обработчик-наблюдатель _handleModelEvent, который будет реагировать на изменения модели

  _handleModelEvent(updateType, data) {
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UpdateType.PATCH:
        //обновить часть списка
        this._filmCardPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        //обновить список
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
  }

  // TODO перенести сортировку из main.js
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
}
