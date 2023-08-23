/** 
 * @vitest-environment jsdom
 * @vitest-environment-options {"url": "https://www.treasurydirect.gov/"}
*/
import React from 'react';
import {describe, expect, test} from 'vitest';
import {render} from '../src/util/test.tsx';
import {screen} from '@testing-library/react';
import App from '../src/App';

describe('app', () => {
    test('should load the CurrentDebt component', async () => {
      render(<App />);
      await screen.findByText(/Current Debt to the Penny/i);
      await screen.findByText(/Government Holdings/i);
      await screen.findByText(/Public Debt/i);
      await screen.findByText(/Total Debt/i);
    });
});