export default class DebtModel {
  public effectiveDate: Date;
  public governmentHoldings: number;
  public publicDebt: number;
  public totalDebt: number;

  constructor(debt) {
    this.effectiveDate = debt.effectiveDate;
    this.governmentHoldings = debt.governmentHoldings;
    this.publicDebt = debt.publicHoldings;
    this.totalDebt = debt.totalDebt;
  }
};