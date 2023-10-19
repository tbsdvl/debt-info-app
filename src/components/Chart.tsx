import { LineChart } from '@mui/x-charts';
import DebtModel from "../models/DebtModel";

const Chart = ({ dataset, series, downsampleFactor }) => {
  const downsampleData = (data: Array<DebtModel>, downsampleFactor: number) => {
    const downsampledData = [];

    for (let i = 0; i < data.length; i += downsampleFactor) {
      const chunk = data.slice(i, i + downsampleFactor);
      if (chunk.length > 0) {
        const averageDataPoint = {
          effectiveDate: chunk[0].effectiveDate,
          governmentHoldings: chunk.reduce((sum, point) => sum + point.governmentHoldings, 0) / chunk.length,
          publicDebt: chunk.reduce((sum, point) => sum + point.publicDebt, 0) / chunk.length,
          totalDebt: chunk.reduce((sum, point) => sum + point.totalDebt, 0) / chunk.length,
        };
        downsampledData.push(averageDataPoint);
      }
    }

    return downsampledData;
  };


  const downsampledData = downsampleData(dataset, downsampleFactor);
  const debtData = downsampledData.map(entry => {
    return {
      publicDebt: entry.publicDebt ?? (0).toFixed(2),
      governmentHoldings: entry.governmentHoldings ?? (0).toFixed(2),
      totalDebt: entry.totalDebt ?? (0).toFixed(2),
      effectiveDate: new Date(entry.effectiveDate)
    }
  });

  const customize = {
    height: 500,
    legend: { hidden: false },
    margin: { top: 5, left: 125 },
    stackingOrder: 'descending',
  };

  return (
      <LineChart
        tooltip={{ trigger: 'item' }}
        xAxis={[
          {
            id: 'Years',
            dataKey: 'effectiveDate',
            valueFormatter: (v) => v.getFullYear(),
            min: debtData[debtData.length - 1].effectiveDate,
            max: debtData[0].effectiveDate,
            scaleType: 'time',
            hideTooltip: false,
            label: 'Years',
          },
        ]}
        yAxis={[
          {
            axisId: 'y-axis-1',
            valueFormatter: (v) => `\$${v}`
          }
        ]}
        sx={{
          "& .MuiChartsAxis-root line": {
            stroke: 'white',
          },
          "& .MuiChartsLegend-series tspan": {
            fill: 'white'
          },
          "& .MuiChartsAxis-tickContainer text": {
            fill: 'white',
          },
          "& .MuiChartsAxis-label tspan": {
            fill: 'white',
          }
        }}
        series={series}
        dataset={debtData}
        {...customize}
    />
  );
}

export default Chart;