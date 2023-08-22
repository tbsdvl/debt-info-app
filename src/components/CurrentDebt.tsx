import {useQuery, useQueryClient} from 'react-query';
import {getCurrentDebt} from '../api';

const CurrentDebt = () => {
  const {isLoading, data} = useQuery('current', getCurrentDebt);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (data) {
    return (
      <>
        <span>{data.effectiveDate}</span>
        <div>
          Current Total Debt: {data.totalDebt}
        </div>
      </>
    )
  }
}

export default CurrentDebt;
