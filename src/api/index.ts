import axios from 'axios';
import DebtModel from '../models/DebtModel.ts';
import {getDateInfo} from '../util/date.ts';

const baseUrl = 'https://www.treasurydirect.gov/NP_WS';

const get = async (url: string) => {
  return await axios.get(`${baseUrl}${url}`);
}

export const getCurrentDebt = async (): DebtModel | undefined => {
  try {
    const getCurrentDebtResponse = await get(`/debt/current?format=json`);
    if (getCurrentDebtResponse && getCurrentDebtResponse.status === 200) {
      return new DebtModel(getCurrentDebtResponse.data);
    }
  } catch (err) {
    console.error(err);
  }
}

export const getDebtByDate = async (date): DebtModel | undefined => {
  try {
    const info = getDateInfo(date);
    const getDebtByDateResponse = await get(`/debt/${info.year}/${info.month}/${info.day}`);
    if (getDebtByDateResponse && getDebtByDateResponse.status === 200) {
      return new DebtModel(getDebtByDateResponse.data);
    }
  } catch (err) {
    console.error(err);
  }
}