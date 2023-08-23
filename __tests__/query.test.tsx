/** 
 * @vitest-environment jsdom
 * @vitest-environment-options {"url": "https://www.treasurydirect.gov/"}
*/
import { renderHook, waitFor } from '@testing-library/react';
import {QueryClient, QueryClientProvider, UseQueryResult} from 'react-query';
import {getCurrentDebtQuery, getDebtByDateQuery, getDebtByDateRangeQuery} from '../src/queries';
import {describe, expect, test} from 'vitest';

describe('query', () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  const getQueryResult = (query: UseQueryResult<any, unknown>, ...args) => {
    return renderHook(() => query(...args), { wrapper });
  }

  test('should successfully retrieve the current debt', async () => {
    const { result } = getQueryResult(getCurrentDebtQuery);
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    await waitFor(() => expect(result.current.data).toBeDefined());
    await waitFor(() => expect(result.current.data.governmentHoldings).toBeDefined());
    await waitFor(() => expect(result.current.data.publicDebt).toBeDefined());
    await waitFor(() => expect(result.current.data.totalDebt).toBeDefined());
    await waitFor(() => expect(result.current.data.effectiveDate).toBeDefined());
  });

  test('should successfully retrieve the debt information for a valid date', async () => {
    const { result } = getQueryResult(getDebtByDateQuery, '2018-04-13 19:18');
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    await waitFor(() => expect(result.current.data).toBeDefined());
    await waitFor(() => expect(result.current.data.governmentHoldings).toBe(5667057298759.77));
    await waitFor(() => expect(result.current.data.publicDebt).toBe(15396372854511.25));
    await waitFor(() => expect(result.current.data.totalDebt).toBe(21063430153271.02));
    await waitFor(() => expect(result.current.data.effectiveDate).toBe('April 13, 2018 EDT'));
  });

  test('should fail to retrieve the debt information for a invalid date', async () => {
    const { result } = getQueryResult(getDebtByDateQuery, 'not a date');
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    await waitFor(() => expect(result.current.data).toBeUndefined());
  });

  test('should successfully retrieve the debt information for a valid date range', async () => {
    const { result } = getQueryResult(getDebtByDateRangeQuery, '2018-04-13 19:18', '2020-01-07 19:18');
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    await waitFor(() => expect(result.current.data).toBeDefined());
    await waitFor(() => expect(result.current.data.length).toBeGreaterThan(1));
  });

  test('should fail to retrieve the debt information for an invalid date range', async () => {
    const { result } = getQueryResult(getDebtByDateQuery, '2020-01-07 19:18', '2018-04-13 19:18');
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    await waitFor(() => expect(result.current.data).toBeUndefined());
  });
});
