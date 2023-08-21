import {useQuery, useQueryClient} from 'react-query';
import {getCurrentDebt} from './api';

const App = () => {
  const queryClient = useQueryClient();
  const {isLoading, data} = useQuery('current', getCurrentDebt);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (data) {
  console.log(data);
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

export default App;
