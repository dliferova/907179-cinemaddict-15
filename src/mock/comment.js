import {generateRandomDate, getRandomFromRange} from './utils.js';
import dayjs from 'dayjs';

const getData = () => {
  const generatedData = generateRandomDate(new Date(2018, 0, 1), new Date());
  return dayjs(generatedData).format('YYYY/MM/DD HH:mm');
};

const date = getData();

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

export const generateComment = () => ({
  comment: generateCommentText(),
  emotions: {
    smile: true,
    sleeping: false,
    puke: false,
    angry: false,
  },
  author: generateAuthorName(),
  date,
});
