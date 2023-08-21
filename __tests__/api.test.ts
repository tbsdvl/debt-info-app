import {describe, expect, test} from 'vitest';
import {getCurrentDebt} from '../src/api';

describe('api', () => {
  test('should successfully retrieve the current debt', async () => {
    const currentDebt = await getCurrentDebt();
    expect(currentDebt).toBeDefined();
    expect(currentDebt.governmentHoldings).toBe(6853217148560.19);
  });
})