import {useQuery} from 'react-query';
import {getCurrentDebt} from '../api';

export const getCurrentDebtQuery = () => {
  return useQuery({queryKey: ['current'], queryFn: getCurrentDebt});
}