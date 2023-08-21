import dayjs from 'dayjs';
import DateInfoModel from '../models/DateInfoModel.ts';

export const getDateInfo = (date: string | Date) => {
  const dateInfo = dayjs(date);
  const day = dateInfo.date();
  const month = dateInfo.month() + 1;
  return new DateInfoModel({
    day: day >= 10 ? day : `0${day}`,
    month: month >= 10 ? month : `0${month}`,
    year: dateInfo.year()
  });
}

export const formatDate = (date: DateInfoModel) => {
  return `${date.year}-${date.month}-${date.day}`;
}