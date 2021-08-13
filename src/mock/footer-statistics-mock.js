import {getRandomFromRange} from '../utils/common.js';

const generateTotalMoviesCount = () => getRandomFromRange(1000, 10000);

export const generateStatisticData = () => ({
  totalMoviesCount: generateTotalMoviesCount(),
});
