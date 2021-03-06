import AbstractObserver from '../utils/observer.js';
import dayjs from 'dayjs';

export default class Films extends AbstractObserver {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  getFilms() {
    return this._films.slice();
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        title: film['film_info']['title'],
        alternativeTitle: film['film_info']['alternative_title'],
        rating: film['film_info']['total_rating'],
        poster: film['film_info']['poster'],
        ageRestriction: film['film_info']['age_rating'],
        director: film['film_info']['director'],
        screenwriters: film['film_info']['writers'],
        cast: film['film_info']['actors'],
        releaseDate: dayjs(film['film_info']['release']['date']),
        releaseCountry: film['film_info']['release']['release_country'],
        duration: film['film_info']['runtime'],
        genres: film['film_info']['genre'],
        description: film['film_info']['description'],
        isAddedToWatchList: film['user_details']['watchlist'],
        isAlreadyWatched: film['user_details']['already_watched'],
        isFavorite: film['user_details']['favorite'],
        watchingDate: film['user_details']['watching_date'] ? dayjs(film['user_details']['watching_date']) : null,
      },
    );

    delete adaptedFilm['film_info'];
    delete adaptedFilm['user_details'];

    return adaptedFilm;
  }

  static adaptToServer(film) {
    return {
      'id': film.id,
      'comments': film.comments,
      'film_info': {
        'title': film.title,
        'alternative_title': film.alternativeTitle,
        'total_rating': film.rating,
        'poster': film.poster,
        'age_rating': film.ageRestriction,
        'director': film.director,
        'writers': film.screenwriters,
        'actors': film.cast,
        'release': {
          'date': film.releaseDate,
          'release_country': film.releaseCountry,
        },
        'runtime': film.duration,
        'genre': film.genres,
        'description': film.description,
      },
      'user_details': {
        'watchlist': film.isAddedToWatchList,
        'already_watched': film.isAlreadyWatched,
        'favorite': film.isFavorite,
        'watching_date': film.watchingDate,
      },
    };
  }
}
