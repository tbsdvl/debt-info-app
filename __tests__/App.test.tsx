// @vitest-environment jsdom
import React from 'react';
import {describe, expect, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import App from '../src/App';

describe('app', () => {
    test('should load the app component', async () => {
        render(<App />);
        await screen.findByText('Hello World!');
        expect(screen.getByText('Hello World!'));
    });
});