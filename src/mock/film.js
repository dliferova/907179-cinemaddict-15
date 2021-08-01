import {generateRandomDate, getRandomFromRange} from './utils.js';
import {generateComment} from './comment.js';
import dayjs from 'dayjs';

const generateTitle = () => {
  const titles = [
    'The Dance of Life',
    'Sagebrush Trail',
    'The Man with the Golden Arm',
    'Santa Claus Conquers the Martians',
    'Popeye the Sailor Meets Sindbad the Sailor',
    'Made for Each Other',
    'The Great Flamarion',
  ];

  const randomIndex = getRandomFromRange(0, titles.length - 1);

  return titles[randomIndex];
};

const generatePoster = () => {
  const posters = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg',
  ];

  const randomIndex = getRandomFromRange(0, posters.length - 1);

  return posters[randomIndex];
};

const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
  ];

  const randomIndex = getRandomFromRange(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const generateRating = () => {
  const firstNumber = getRandomFromRange(1, 9);
  const secondNumber = getRandomFromRange(0, 9);
  return `${firstNumber}.${secondNumber}`;
};

const generateYear = () => {
  const generatedData = generateRandomDate(new Date(2018, 0, 1), new Date());
  return dayjs(generatedData).format('YYYY');
};

const generateDuration = () => {
  const hours = getRandomFromRange(1, 2);
  const minutes = getRandomFromRange(1, 59);
  return `${hours}h ${minutes}m`;
};

const generateGenre = () => {
  const ganres = [
    'Comedy',
    'Thriller',
    'Drama',
    'Horror',
    'Cartoon',
    'Musical',
    'Western',
  ];

  const randomIndex = getRandomFromRange(0, ganres.length - 1);

  return ganres[randomIndex];
};

export const generateFilm = () => ({
  poster: `/public/images/posters/${generatePoster()}`,
  title: generateTitle(),
  rating: generateRating(),
  year: generateYear(),
  duration: generateDuration(),
  genre: generateGenre(),
  description: generateDescription(),
  comments: new Array(getRandomFromRange(0,5)).fill(null).map(() => generateComment()),
});
