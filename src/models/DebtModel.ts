export default class DebtModel {
  public effectiveDate: Date | number;
  public governmentHoldings: number;
  public publicDebt: number;
  public totalDebt: number;

  constructor(debt) {
    this.effectiveDate = debt.effectiveDate;
    this.governmentHoldings = debt.governmentHoldings;
    this.publicDebt = debt.publicDebt;
    this.totalDebt = debt.totalDebt;
  }
};