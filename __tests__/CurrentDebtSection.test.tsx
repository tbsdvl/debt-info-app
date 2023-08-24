/** 
 * @vitest-environment jsdom
 * @vitest-environment-options {"url": "https://www.treasurydirect.gov/"}
*/
import React from 'react';
import {describe, test} from 'vitest';
import {render} from '../src/util/test.tsx';
import {screen} from '@testing-library/react';
import CurrentDebtSection from '../src/components/CurrentDebtSection.tsx';

describe('CurrentDebtSection', () => {
    test('should load the CurrentDebtSection component', async () => {
      render(<CurrentDebtSection />);
      await screen.findByText(/Current Debt to the Penny/i);
      await screen.findByText(/Government Holdings/i);
      await screen.findByText(/Public Debt/i);
      await screen.findByText(/Total Debt/i);
    });
});