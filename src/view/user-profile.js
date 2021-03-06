import SmartView from './smart.js';
import {getRankRating} from '../utils/stats-utils.js';
import {filter} from '../utils/filter.js';
import {FilterType} from '../const.js';

const createUserProfileTemplate = (data) => {
  const {films} = data;
  const watchedFilms = filter[FilterType.HISTORY](films).length;
  const rank = getRankRating(watchedFilms);

  return `<section class="header__profile profile">
    <p class="profile__rating"> ${rank === null ? 'Loading...' : `${rank}`}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
   </section>`;
};

export default class UserProfile extends SmartView {
  constructor(filmsModel) {
    super();
    this._filmsModel = filmsModel;
    this._data = UserProfile.parseToData(filmsModel.getFilms(), getRankRating());
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this.updateData({
      rank: getRankRating(this.watchedFilms.length),
    });
  }

  getTemplate() {
    return createUserProfileTemplate(this._data);
  }

  restoreHandlers() {
  }

  _handleModelEvent() {
    this.updateData({
      films: this._filmsModel.getFilms(),
      rank: getRankRating(this.watchedFilms.length),
    });
  }

  get watchedFilms() {
    return filter[FilterType.HISTORY](this._filmsModel.getFilms());
  }

  static parseToData(films, rank) {
    return {
      films: films,
      rank: rank,
    };
  }
}
