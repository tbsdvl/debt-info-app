import axios from 'axios';
import DebtModel from '../models/DebtModel.ts';

export const getCurrentDebt = async (): DebtModel | undefined => {
  try {
    const getCurrentDebtResponse = await axios.get("https://www.treasurydirect.gov/NP_WS/debt/current?format=json");
    if (getCurrentDebtResponse && getCurrentDebtResponse.status === 200) {
      return new DebtModel(getCurrentDebtResponse.data);
    }
  } catch (err) {
    console.error(err);
  }
}