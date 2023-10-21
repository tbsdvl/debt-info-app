import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {getDebtByDateRangeQuery} from '../queries';
import Chart from './Chart.tsx';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// change to the calendar
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { DateRange } from '@mui/x-date-pickers-pro';

const DebtInfoChart = () => {
  const initBeginningDate = "January 4, 1993 EST";
  const initEndingDate = new Date();
  const {isLoading, data} = getDebtByDateRangeQuery(initBeginningDate, initEndingDate);
  const [dateRange, setDateRange] = React.useState<DateRange<Dayjs>>([
    dayjs(initBeginningDate),
    dayjs(initEndingDate),
  ]);

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
      valueFormatter: (v: number) => `\$${v}`
    },
    {
      id: 'governmentHoldings',
      dataKey: 'governmentHoldings',
      label: 'Government Holdings',
      type: 'line',
      showMark: ({ index }) => index % 2 === 0,
      tooltip: { label: 'Government Holdings', valueKey: 'governmentHoldings' },
      valueFormatter: (v: number) => `\$${v}`
    },
    {
      id: 'publicDebt',
      dataKey: 'publicDebt',
      label: 'Public Debt',
      type: 'line',
      showMark: ({ index }) => index % 2 === 0,
      tooltip: { label: 'Public Debt', valueKey: 'publicDebt' },
      valueFormatter: (v: number) => `\$${v}`
    },
  ];

  // setup useEffect to send a request to the api when a date changes
  React.useEffect(() => {
    (async () => {
      // Send the request when the date range changes.
      if (dateRange) {
        getDebtByDateRangeQuery(dateRange[0].locale(), date)
      }
    })();
  }, [dateRange]);

  if (data) {
    return (
      <>
        <h2>United States Historical Debt Data</h2>
        <Chart
          dataset={data}
          series={series}
          downsampleFactor={250}
          />
          {/* Add the calendar */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateRangeCalendar
                minDate={dayjs(initBeginningDate)}
                maxDate={dayjs(initEndingDate)}
                value={dateRange}
                onChange={(dates) => setDateRange(dates)}
              />
          </LocalizationProvider>
        </>
    );
  }
}

export default DebtInfoChart;