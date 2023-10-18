import {Box} from "@mui/material";
import { LineChart } from '@mui/x-charts';

const Chart = ({ dataset }) => {
  console.log(dataset);

  const myEntries = dataset.map(entry => {
    return {
      publicDebt: entry.publicDebt,
      governmentSpending: entry.governmentSpending,
      totalDebt: entry.totalDebt,
      effectiveDate: new Date(entry.effectiveDate).getFullYear()
    }
  })

  // dataset.forEach(entry => {
  //   console.log(new Date(entry.effectiveDate).getFullYear())
  //   entry.effectiveDate = new Date(entry.effectiveDate).getFullYear();
  // })
  
  const keyToLabel = {
    // 'public': 'publicDebt',
    // 'government': 'governmentSpending',
    'total': 'totalDebt'
  };

  const colors: { [key: string]: string } = {
    // 'public': 'blue',
    // 'government': 'yellow',
    'total': 'green'
  };

  const stackStrategy = {
  stack: 'total',
  area: true,
  stackOffset: 'none', // To stack 0 on top of others
  } as const;
  
  const customize = {
  height: 300,
  legend: { hidden: true },
  margin: { top: 5 },
  stackingOrder: 'descending',
  sx: {
    '& .MuiMarkElement-root': {
      display: 'none',
    },
  },
};
  
  return (
    <Box>
      <LineChart
      xAxis={[
        {
          dataKey: 'effectiveDate',
          valueFormatter: (v) => v.toString(),
          min: myEntries[myEntries.length - 1].effectiveDate,
          max: myEntries[0].effectiveDate,
        },
      ]}
      series={Object.keys(keyToLabel).map((key) => ({
        dataKey: key,
        label: keyToLabel[key],
        color: colors[key],
        ...stackStrategy,
      }))}
      dataset={myEntries}
      {...customize}
    />
    </Box>
  );
}

export default Chart;