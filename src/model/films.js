import AbstractObserver from '../utils/observer.js';

export default class Films extends AbstractObserver {
  constructor() {
    super();
    this._films = [];
  }

  //Записывает в модель данные
  setFilms(films) {
    this._films = films.slice();
  }

  //Возвращает значение приватного свойства
  getFilms() {
    return this._films;
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
}
