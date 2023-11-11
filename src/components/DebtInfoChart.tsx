import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {getDebtByDateRangeQuery} from '../queries';
import Chart from './Chart.tsx';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MultiInputDateRangeField  } from '@mui/x-date-pickers-pro/MultiInputDateRangeField';
import { DateRange } from '@mui/x-date-pickers-pro';
import DebtModel from '../models/DebtModel.ts';

const DebtInfoChart = () => {
  const initBeginningDate = new Date("January 4, 1993 EST");
  const initEndingDate = new Date();
  const [initialDataset, setInitialDataset] = React.useState<Array<DebtModel>>([]);
  const [dateRange, setDateRange] = React.useState<DateRange<Dayjs>>([
    dayjs(initBeginningDate),
    dayjs(initEndingDate),
  ]);
  const {isLoading, isError, data, refetch} = getDebtByDateRangeQuery(
    dateRange[0]?.isValid() ? dateRange[0]?.toDate() : initBeginningDate,
    dateRange[1]?.isValid() ? dateRange[1]?.toDate() : initEndingDate
  );

  const fetchDebtData = (): void => {
    refetch();
  }

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>Error!</>;
  }

  const series = [
    {
      id: 'totalDebt',
      dataKey: 'totalDebt',
      label: 'Total Debt',
      type: 'line',
      showMark: ({ index }: { index: number }) => index % 2 === 0,
      tooltip: { label: 'Total Debt', valueKey: 'totalDebt' },
      valueFormatter: (v: number) => `\$${v}`
    },
    {
      id: 'governmentHoldings',
      dataKey: 'governmentHoldings',
      label: 'Government Holdings',
      type: 'line',
      showMark: ({ index }: { index: number }) => index % 2 === 0,
      tooltip: { label: 'Government Holdings', valueKey: 'governmentHoldings' },
      valueFormatter: (v: number) => `\$${v}`
    },
    {
      id: 'publicDebt',
      dataKey: 'publicDebt',
      label: 'Public Debt',
      type: 'line',
      showMark: ({ index }: { index: number }) => index % 2 === 0,
      tooltip: { label: 'Public Debt', valueKey: 'publicDebt' },
      valueFormatter: (v: number) => `\$${v}`
    },
  ];

  if (data && !initialDataset.length) {
    setInitialDataset(data as DebtModel[]);
  }

  if (data) {
    return (
      <>
        <h2>United States Historical Debt Data</h2>
        <Chart
          dataset={data as DebtModel[]}
          initialDataset={initialDataset}
          series={series}
          downsampleFactor={250}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MultiInputDateRangeField
                minDate={dayjs(initBeginningDate)}
                maxDate={dayjs(initEndingDate)}
                value={dateRange}
                onChange={(dates: any) => {
                  setDateRange(dates);
                  fetchDebtData();
                }}
                sx={{
                  "& .MuiInputBase-input": {
                    color: 'white',
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: 'white'
                  },
                }}
              />
          </LocalizationProvider>
        </>
    );
  }
}

export default DebtInfoChart;