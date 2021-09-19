import Api from './api.js';

export const AUTHORIZATION = 'Basic 2xci13mod4x';
export const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict';
export const api = new Api(END_POINT, AUTHORIZATION);

export const SortType = {
  SORT_BY_DEFAULT: 'default',
  SORT_BY_DATE: 'sort-data',
  SORT_BY_RATING: 'sort-rating',
};

export const UserAction = {
  UPDATE_FILM_CARD: 'UPDATE_FILM_CARD',
  DELETE_COMMENT: 'DELETE_COMMENT',
  ADD_COMMENT: 'ADD_COMMENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const FilterType = {
  ALL: 'all',
  WATCH_LIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
  STATS: 'stats',
};

export const MenuItem = {
  FILMS: 'FILMS',
  STATISTICS: 'STATISTICS',
};

export const StatsFilterType = {
  ALL_TIME: 'all-time',
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
};

export const Ranks = {
  NOVICE: {
    name: 'Novice',
    minCount: 1,
  },
  FAN: {
    name: 'Fan',
    minCount: 11,
  },
  MOVIE_BUFF: {
    name: 'Movie Buff',
    minCount: 21,
  },
};
