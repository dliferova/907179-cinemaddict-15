import AbstractObserver from '../utils/observer.js';
import {FilterType} from '../const.js';

export default class Filter extends AbstractObserver {
  constructor() {
    super();
    this._checkedFilter = FilterType.ALL;
  }

  setFilter(updateType, filter) {
    this._checkedFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._checkedFilter;
  }
}
