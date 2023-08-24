/** 
 * @vitest-environment jsdom
 * @vitest-environment-options {"url": "https://www.treasurydirect.gov/"}
*/
import React from 'react';
import {describe, test} from 'vitest';
import {render} from '../src/util/test.tsx';
import {screen} from '@testing-library/react';
import App from '../src/App';

describe('App', () => {
    test('should load the App component', async () => {
      render(<App />);
      await screen.findByText(/United States Debt/i);
    });
});