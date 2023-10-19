/**
 * @vitest-environment jsdom
 * @vitest-environment-options {"url": "https://www.treasurydirect.gov/"}
*/
import React from 'react';
import {describe, test} from 'vitest';
import {render} from '../src/util/test.tsx';
import {screen} from '@testing-library/react';
import DebtInfoChartSection from '../src/components/DebtInfoChartSection.tsx';

describe('DebtInfoChartSection', () => {
    test('should load the DebtInfoChartSection component', async () => {
      render(<DebtInfoChartSection />);
      await screen.findByText(/United States Historical Debt Data/i);
      // await screen.findByText(/Government Holdings/i);
      // await screen.findByText(/Public Debt/i);
      // await screen.findByText(/Total Debt/i);
    });
});