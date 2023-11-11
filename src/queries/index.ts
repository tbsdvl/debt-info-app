import {useQuery} from 'react-query';
import {getCurrentDebt, getDebtByDate, getDebtByDateRange} from '../api';
import dayjs from 'dayjs';

export const validateDate = (date: dayjs.Dayjs, opts: any): Date | undefined => {
  if (!date.isValid()) {
    return;
  }

  const validDate = date.toDate();
  if (validDate === opts.dateRange[0]?.toDate() && validDate < opts.initBeginningDate) {
    return;
  } else if (validDate === opts.dateRange[1]?.toDate() && validDate > opts.initEndingDate) {
    return;
  }

  return validDate;
}

export const getCurrentDebtQuery = () => {
  return useQuery({queryKey: ['current'], queryFn: getCurrentDebt});
}

export const getDebtByDateQuery = (date: string | Date) => {
  return useQuery({queryKey: ['byDate'], queryFn: () => getDebtByDate(date)});
}

export const getDebtByDateRangeQuery = (startDate: string | Date, endDate: string | Date) => {
  return useQuery({queryKey: ['byDateRange'], queryFn: () => getDebtByDateRange(startDate, endDate)});
}