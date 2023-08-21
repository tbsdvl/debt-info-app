import {describe, expect, test} from 'vitest';
import {getCurrentDebt, getDebtByDate, getDebtByDateRange} from '../src/api';

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

  test('should successfully retrieve the debt for a given date with a double digit month', async () => {
    const debtByDate = await getDebtByDate('2018-12-13 19:18');
    expect(debtByDate).toBeDefined();
    expect(debtByDate.governmentHoldings).toBe(5789456992167.26);
    expect(debtByDate.publicDebt).toBe(16033637518538.32);
    expect(debtByDate.totalDebt).toBe(21823094510705.58);
  });

  test('should successfully retrieve the debt for a given date with a single digit day', async () => {
    const debtByDate = await getDebtByDate('2018-12-04 19:18');
    expect(debtByDate).toBeDefined();
    expect(debtByDate.governmentHoldings).toBe(5795041724457.65);
    expect(debtByDate.publicDebt).toBe(16041645512514.40);
    expect(debtByDate.totalDebt).toBe(21836687236972.05);
  });

  test('should successfully retrieve debt data within a range of dates', async () => {
    const debtByDateRange = await getDebtByDateRange('2018-04-13 19:18', '2020-12-13 19:18');
    expect(debtByDateRange).toBeDefined();
    expect(debtByDateRange.length).toBeGreaterThan(1);
  });
});