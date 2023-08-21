import dayjs from 'dayjs';
import DateInfoModel from '../models/DateInfoModel.ts';

export const getDateInfo = (date: Date) => {
  const dateInfo = dayjs(date);
  const month = dateInfo.month() + 1;
  return new DateInfoModel({
    day: dateInfo.date(),
    month: month >= 10 ? month : `0${month}`,
    year: dateInfo.year()
  });
}