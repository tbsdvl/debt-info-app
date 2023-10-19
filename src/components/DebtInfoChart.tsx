import {getDebtByDateRangeQuery} from '../queries';
import Chart from './Chart.tsx';

const DebtInfoChart = () => {
  const {isLoading, data} = getDebtByDateRangeQuery("January 4, 1993 EST", new Date());

  if (isLoading) {
    return <>Loading...</>;
  }

  const series = [
    {
      id: 'totalDebt',
      dataKey: 'totalDebt',
      label: 'Total Debt',
      type: 'line',
      showMark: ({ index }) => index % 2 === 0,
      tooltip: { label: 'Total Debt', valueKey: 'totalDebt' },
    },
    {
      id: 'governmentHoldings',
      dataKey: 'governmentHoldings',
      label: 'Government Holdings',
      type: 'line',
      showMark: ({ index }) => index % 2 === 0,
      tooltip: { label: 'Government Holdings', valueKey: 'governmentHoldings' },
    },
    {
      id: 'publicDebt',
      dataKey: 'publicDebt',
      label: 'Public Debt',
      type: 'line',
      showMark: ({ index }) => index % 2 === 0,
      tooltip: { label: 'Public Debt', valueKey: 'publicDebt' },
    },
  ];

  if (data) {
    return (
      <>
        <h2>United States Historical Debt Data</h2>
        <Chart
          dataset={data}
          series={series}
          downsampleFactor={250}
          />
      </>
    );
  }
}

export default DebtInfoChart;