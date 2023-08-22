import {useQuery} from 'react-query';
import {getCurrentDebt, getDebtByDate, getDebtByDateRange} from '../api';

export const getCurrentDebtQuery = () => {
  return useQuery({queryKey: ['current'], queryFn: getCurrentDebt});
}

export const getDebtByDateQuery = (date: string | Date) => {
  return useQuery({queryKey: ['byDate'], queryFn: () => getDebtByDate(date)});
}

export const getDebtByDateRangeQuery = (startDate: string | Date, endDate: string | Date) => {
  return useQuery({queryKey: ['byDateRange'], queryFn: () => getDebtByDateRange(startDate, endDate)});
}