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

  //Добавить alternativeTitle

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        poster: film['film_info']['poster'],
        title: film['film_info']['title'],
        alternativeTitle: film['film_info']['alternative_title'],
        ageRestriction: film['film_info']['age_rating'],
        rating: film['film_info']['total_rating'],
        releaseDate: dayjs(film['film_info']['release']['date']),
        duration: film['film_info']['runtime'],
        genres: film['film_info']['genre'],
        description: film['film_info']['description'],
        director: film['film_info']['director'],
        screenwriters: film['film_info']['writers'],
        cast: film['film_info']['actors'],
        country: film['film_info']['release']['release_country'],
        isAddedToWatchList: film['user_details']['watchlist'],
        isAlreadyWatched: film['user_details']['already_watched'],
        isFavorite: film['user_details']['favorite'],
        comments: [],
      },
    );

    delete film['film_info']['title'];
    delete film['film_info']['alternative_title'];
    delete film['film_info']['age_rating'];
    delete film['film_info']['total_rating'];
    delete film['film_info']['release']['date'];
    //delete film['film_info']['runtime'];
    delete film['film_info']['genre'];
    delete film['film_info']['description'];
    delete film['film_info']['director'];
    delete film['film_info']['writers'];
    delete film['film_info']['actors'];
    delete film['film_info']['release']['release_country'];
    delete film['user_details']['watchlist'];
    delete film['user_details']['already_watched'];
    delete film['user_details']['favorite'];

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        'film_info': {
          'title': film.title,
          'alternative_title': film.alternativeTitle,
          'total_rating': film.rating,
          'poster': film.poster,
          'age_rating': film.ageRestriction,
          'director': film.director,
          'writers': film.writers,
          'actors': film.actors,
          'release': {
            'date': film.releaseDate,
            'release_country': film.releaseCountry,
          },
          'genre': film.genres,
          'runtime': film.runtime,
          'description': film.description,
        },
        'user_details': {
          'watchlist': film.isAddedToWatchList,
          'already_watched': film.isAlreadyWatched,
          'favorite': film.isFavorite,
        },
      },
    );

    delete film.title;
    delete film.alternativeTitle;
    delete film.rating;
    delete film.poster;
    delete film.ageRestriction;
    delete film.director;
    delete film.writers;
    delete film.actors;
    delete film.releaseDate;
    delete film.releaseCountry;
    delete film.genres;
    delete film.runtime;
    delete film.description;
    delete film.isAddedToWatchList;
    delete film.isAlreadyWatched;
    delete film.isFavorite;

    return adaptedFilm;
  }
}
