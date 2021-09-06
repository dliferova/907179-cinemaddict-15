import {generateRandomDate, getRandomFromRange} from '../utils/common.js';
import {generateComment, generateCommentText, generateEmotion} from './comment-mock.js';
import {nanoid} from 'nanoid';

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
  const firstNumber = getRandomFromRange(5, 9);
  const secondNumber = getRandomFromRange(0, 9);
  return `${firstNumber}.${secondNumber}`;
};

const generateReleaseDate = () => generateRandomDate(new Date(1955, 0, 1), new Date());

const generateDuration = () => {
  const hours = getRandomFromRange(1, 2);
  const minutes = getRandomFromRange(1, 59);
  return {hours, minutes};
};

const generateGenre = () => [
  'Comedy',
  'Thriller',
  'Drama',
];

const generateAgeRestriction = () => {
  const ages = [
    '6+',
    '12+',
    '16+',
    '18',
  ];

  const randomIndex = getRandomFromRange(0, ages.length - 1);

  return ages[randomIndex];
};

const generateDirectorName = () => {
  const names = [
    'Anthony Mann',
    'Sergio Leone',
    'Ridley Scott',
    'David Lean',
    'Ingmar Bergman',
    'Stanley Kubrick',
    'David Fincher',
  ];

  const randomIndex = getRandomFromRange(0, names.length - 1);

  return names[randomIndex];
};

const generateWritersName = () => {
  const names = [
    'Anne Wigton',
    'Heinz Herald',
    'Richard Weil',
  ];

  const randomIndex = getRandomFromRange(0, names.length - 1);

  return names[randomIndex];
};

const generateActorsName = () => {
  const names = [
    'Erich von Stroheim',
    'Mary Beth Hughes',
    'Dan Duryea',
  ];

  const randomIndex = getRandomFromRange(0, names.length - 1);

  return names[randomIndex];
};

const generateCountry = () => {
  const countres = [
    'USA',
    'France',
    'Italy',
    'Germany',
    'New Zealand',
  ];

  const randomIndex = getRandomFromRange(0, countres.length - 1);

  return countres[randomIndex];
};

export const generateFilmCard = () => ({
  id: nanoid(),
  poster: `./images/posters/${generatePoster()}`,
  title: generateTitle(),
  ageRestriction: generateAgeRestriction(),
  rating: generateRating(),
  releaseDate: generateReleaseDate(),
  duration: generateDuration(),
  genres: generateGenre(),
  description: generateDescription(),
  director: generateDirectorName(),
  screenwriters: generateWritersName(),
  cast: generateActorsName(),
  country: generateCountry(),
  comments: new Array(getRandomFromRange(0,5)).fill(null).map(() => generateComment(generateCommentText(), generateEmotion())),
  isAddedToWatchList: false,
  isAlreadyWatched: false,
  isFavorite: false,
});
