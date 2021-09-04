import AbstractView from './abstract.js';
import {FilterType} from "../const";

const createSiteNavigationItem = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  if (count === null) {
    return `<a href="#${type.toLowerCase()}"
    class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}" data-filter-name = "${type.toLowerCase()}">${name}</a>`;
  } else {
    return `<a href="#${type.toLowerCase()}"
      class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}" data-filter-name = "${type.toLowerCase()}">${name}
      <span class="${type === FilterType.ALL ? 'visually-hidden': 'main-navigation__item-count'}">${count}</span>
      </a>`;
  }
};

const createSiteNavigationTemplate = (filterItem, currentFilterType) => {
  const filterItemsTemplate = filterItem.map((filter) => createSiteNavigationItem(filter, currentFilterType))
    .join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};

export default class Filter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSiteNavigationTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterName);
  }

  setFilterChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }
}
