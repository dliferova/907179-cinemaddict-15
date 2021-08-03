import {generateRandomDate, getRandomFromRange} from './utils-mock.js';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const generateDate = () => generateRandomDate(new Date(2020, 0, 1), new Date());

const generateCommentText = () => {
  const texts = [
    'Great movie!',
    'I am not sure which is more pathetic...',
    'When I read the story in school, I remember thinking it would make a great comedy, but it seems like they made this a serious movie.',
    'The film works its magic to a degree',
    'The mesmerizing mayhem of this riverboat journey is a delightful throwback for fans of the old-school adventure genre with chemistry that practically jumps through the screen.',
  ];

  const randomIndex = getRandomFromRange(0, texts.length - 1);

  return texts[randomIndex];
};

const generateAuthorName = () => {
  const names = [
    'Soham Gadre',
    'Todd Jorgenson',
    'Stephanie Archer',
    'Bailey Jo Josie',
    'Melissa Hannon',
  ];

  const randomIndex = getRandomFromRange(0, names.length - 1);

  return names[randomIndex];
};

const generateEmotion = () => {
  const emotions = [
    'angry.png',
    'puke.png',
    'sleeping.png',
    'smile.png',
  ];

  const randomIndex = getRandomFromRange(0, emotions.length - 1);

  return emotions[randomIndex];
};

export const generateComment = () => ({
  textComment: generateCommentText(),
  emotions: generateEmotion(),
  author: generateAuthorName(),
  date: generateDate(),
});
