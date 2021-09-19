import dayjs from 'dayjs';

export const generateRandomDate = (start, end) => dayjs(new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())));

export const getRandomFromRange = (startNumber = 0, endNumber = 0) => {
  if (startNumber < 0) {
    startNumber = 0;
  }

  if (endNumber < 0) {
    endNumber = 0;
  }

  if (endNumber < startNumber) {
    const tmp = startNumber;
    startNumber = endNumber;
    endNumber = tmp;
  }

  return Math.floor(Math.random() * (startNumber - endNumber + 1)) + endNumber;
};
