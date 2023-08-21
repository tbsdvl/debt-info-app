import {describe, expect, test} from 'vitest';
import {getCurrentDebt, getDebtByDate} from '../src/api';

describe('api', () => {
  test('should successfully retrieve the current debt', async () => {
    const currentDebt = await getCurrentDebt();
    expect(currentDebt).toBeDefined();
    expect(currentDebt.governmentHoldings).toBeDefined();
    expect(currentDebt.publicDebt).toBeDefined();
    expect(currentDebt.totalDebt).toBeDefined();
    expect(currentDebt.effectiveDate).toBeDefined();
  });

  test('should successfully retrieve the debt for a given date', async () => {
    const debtByDate = await getDebtByDate('2018-04-13 19:18');
    expect(debtByDate).toBeDefined();
    expect(debtByDate.governmentHoldings).toBe(5667057298759.77);
    expect(debtByDate.publicDebt).toBe(15396372854511.25);
    expect(debtByDate.totalDebt).toBe(21063430153271.02);
  });
})