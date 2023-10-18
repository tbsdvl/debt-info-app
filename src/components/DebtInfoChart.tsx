import {getDebtByDateRangeQuery} from '../queries';
import Chart from './Chart.tsx';

const DebtInfoChart = () => {
  const {isLoading, data} = getDebtByDateRangeQuery("January 4, 1993 EST", new Date());

  if (isLoading) {
    return <>Loading...</>;
  }

  if (data) {
    return (
      <>
        <h2>United States Historical Debt Data</h2>
        <Chart dataset={data} />  
      </>
    );
  }
}

export default DebtInfoChart;