import {Box} from "@mui/material";
import { LineChart } from '@mui/x-charts';

// make this reusable by passing in more props to configure the chart
const Chart = ({ dataset }) => {

  const downsampleData = (data, downsampleFactor) => {
    const downsampledData = [];

    for (let i = 0; i < data.length; i += downsampleFactor) {
      const chunk = data.slice(i, i + downsampleFactor);
      if (chunk.length > 0) {
        // Calculate the average for each numeric field (governmentHoldings, publicDebt, totalDebt)
        const averageDataPoint = {
          effectiveDate: chunk[0].effectiveDate, // Take the effectiveDate of the first point in the chunk
          governmentHoldings: chunk.reduce((sum, point) => sum + point.governmentHoldings, 0) / chunk.length,
          publicDebt: chunk.reduce((sum, point) => sum + point.publicDebt, 0) / chunk.length,
          totalDebt: chunk.reduce((sum, point) => sum + point.totalDebt, 0) / chunk.length,
        };
        downsampledData.push(averageDataPoint);
      }
    }

    return downsampledData;
  };

  const originalData = /* Your original dataset */;
  const downsampledData = downsampleData(originalData, 10); // Downsample by a factor of 10 (adjust as needed)

  // Now, use the downsampledData to render your chart.

  const debtData = dataset.map(entry => {
    return {
      publicDebt: entry.publicDebt ?? (0).toFixed(2),
      governmentHoldings: entry.governmentHoldings ?? (0).toFixed(2),
      totalDebt: entry.totalDebt ?? (0).toFixed(2),
      effectiveDate: new Date(entry.effectiveDate).getFullYear()
    }
  });

  const colors: { [key: string]: string } = {
    'public': 'blue',
    'government': 'yellow',
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
          min: debtData[debtData.length - 1].effectiveDate,
          max: debtData[0].effectiveDate,
          scaleType: ''
        },
      ]}
      series={[
        { dataKey: 'totalDebt', label: 'Total Debt'},
        { dataKey: 'governmentHoldings', label: 'Government Holdings'},
        { dataKey: 'publicDebt', label: 'Public Debt'},
      ]}
      dataset={debtData}
      {...customize}
      slotProps={{ mark: (markProps) => {
        const { x, y, payload } = markProps;

        return (
          <text
            x={x}
            y={y}
            dy={-10}
            fill="red"
            fontSize={12}
            textAnchor="middle"
          >
            {payload.y}
          </text>
        );
      } }}
    />
    </Box>
  );
}

export default Chart;