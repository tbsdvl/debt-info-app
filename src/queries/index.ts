import {useQuery} from 'react-query';
import {getCurrentDebt, getDebtByDate} from '../api';

export const getCurrentDebtQuery = () => {
  return useQuery({queryKey: ['current'], queryFn: getCurrentDebt});
}

export const getDebtByDateQuery = (date: string | Date) => {
  return useQuery({queryKey: ['byDate'], queryFn: () => getDebtByDate(date)});
}