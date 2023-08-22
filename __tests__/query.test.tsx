/** 
 * @vitest-environment jsdom
 * @vitest-environment-options {"url": "https://www.treasurydirect.gov/"}
 */
import { renderHook, waitFor } from '@testing-library/react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {getCurrentDebtQuery} from '../src/queries';
import {describe, expect, test} from 'vitest';

describe('query', () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  test('should successfully retrieve the current debt', async () => {
    const { result } = renderHook(() => getCurrentDebtQuery(), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    await waitFor(() => expect(result.current.data).toBeDefined());
    await waitFor(() => expect(result.current.data.governmentHoldings).toBeDefined());
  });
});
