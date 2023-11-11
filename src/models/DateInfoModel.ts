export default class DateInfoModel {
  public day: number;
  public month: string;
  public year: number;

  constructor(date: any) {
    this.day = date.day;
    this.month = date.month;
    this.year = date.year;
  }
}