import {getRandomFromRange} from '../utils.js';

const generateTotalMoviesCount = () => getRandomFromRange(1000, 10000);

export const generateStatisticData = () => ({
  totalMoviesCount: generateTotalMoviesCount(),
});
