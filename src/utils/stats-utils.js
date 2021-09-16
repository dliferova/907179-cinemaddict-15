import dayjs from 'dayjs';
import {StatsFilterType, Ranks} from '../const.js';

const minutesToHours = (min) => min ? {hour: Math.floor(min / 60), min: min % 60} : {hour: 0, min: 0};

export const getTotalDuration = (films) => minutesToHours(films.reduce((acc, film) => acc + film.duration, 0));

const MAX_PERIOD_IN_YEARS = 120;

export const getDatePeriod = (period) => {
  const to = dayjs().toDate();
  switch (period) {
    case StatsFilterType.YEAR:
      return {from: dayjs().subtract(1, StatsFilterType.YEAR).toDate(), to};
    case StatsFilterType.MONTH:
      return {from: dayjs().subtract(1, StatsFilterType.MONTH).toDate(), to};
    case StatsFilterType.WEEK:
      return {from: dayjs().subtract(1, StatsFilterType.WEEK).toDate(), to};
    case StatsFilterType.TODAY:
      return {from: dayjs().subtract(1, StatsFilterType.TODAY).toDate(), to};
    default:
      return {from: dayjs().subtract(MAX_PERIOD_IN_YEARS, StatsFilterType.YEAR).toDate(), to};
  }
};

export const getRankRating = (count) => {
  if (count >= Ranks.MOVIE_BUFF.minCount) {
    return Ranks.MOVIE_BUFF.name;
  }
  if (count >= Ranks.FAN.minCount) {
    return Ranks.FAN.name;
  }
  if (count >= Ranks.NOVICE.minCount) {
    return Ranks.NOVICE.name;
  }
  return null;
};

