import {getRandomFromRange} from '../utils/common.js';

const generateWatchedFilmsCount = () => getRandomFromRange(10, 200);

const generateDuration = () => {
  const hours = getRandomFromRange(5, 50);
  const minutes = getRandomFromRange(1, 59);
  return {hours, minutes};
};

const generateTopGenre = () => {
  const genres = [
    'Comedy',
    'Thriller',
    'Drama',
    'Horror',
    'Cartoon',
    'Musical',
    'Western',
  ];

  return genres[getRandomFromRange(0, genres.length - 1)];
};

export const generateStatisticData = () => ({
  watchedFilmsCount: generateWatchedFilmsCount(),
  totalDuration: generateDuration(),
  topGenre: generateTopGenre(),
});
