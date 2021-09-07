export const sortByRating = (films) => films.sort((prev, next) => next.rating - prev.rating);
export const sortByDate = (films) => films.sort((prev, next) => next.releaseDate.diff(prev.releaseDate));
