export const createFilmCardTemplate = (film) => {
  const {poster, title, rating, releaseDate, duration, genres, description, comments, isAddedToWatchList, isAlreadyWatched, isFavorite} = film;

  const getControlsItemActiveClassName = (isActive) => {
    if (isActive) {
      return 'film-card__controls-item--active';
    } else {
      return '';
    }
  };

  return`<article class="film-card">
     <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
       <span class="film-card__year">${releaseDate.format('YYYY')}</span>
       <span class="film-card__duration">${duration.hours}h ${duration.minutes}m</span>
       <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${getControlsItemActiveClassName(isAddedToWatchList)}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${getControlsItemActiveClassName(isAlreadyWatched)}" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${getControlsItemActiveClassName(isFavorite)}" type="button">Mark as favorite</button>
       </div>
  </article>`;
};
