export const filmToFilterMap = (films) => ({
  watchlist: films.filter((film) => film.isAddedToWatchList).length,
  favorite: films.filter((film) => film.isFavorite).length,
  history: films.filter((film) => film.isAlreadyWatched).length,
});
