// @vitest-environment jsdom
import React from 'react';
import {describe, expect, test} from 'vitest';
import {render} from '../src/util/test.tsx';
import {screen} from '@testing-library/react';
import App from '../src/App';

describe('app', () => {
    test('should load the app component', async () => {
        // render(<App />);
        // await screen.findByRole('div');
        // expect(screen.getByRole('div')).toBeDefined();
    });
});