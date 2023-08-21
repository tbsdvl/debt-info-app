import {describe, expect, test} from 'vitest';
import {getDateInfo} from '../src/util/date.ts';
import DateInfoModel from '../src/models/DateInfoModel.ts';

describe('date', () => {
  test('it should get the correct day, month, and year for a given date', () => {
    const myDate = getDateInfo('2018-04-13');
    expect(myDate.day).toBe(13);
    expect(myDate.month).toBe('04');
    expect(myDate.year).toBe(2018);
  });
});