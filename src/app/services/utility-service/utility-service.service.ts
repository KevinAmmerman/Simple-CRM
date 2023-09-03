import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityServiceService {

  constructor() { }

  interval(qty: Number, period: String) {
    if (qty == 1) {
      if (period == 'Days') {
        period = 'day';
      } else if (period == 'Weeks') {
        period = 'week';
      } else {
        period = 'month'
      }
      return `${qty} ${period}`;
    } else {
      return `${qty} ${period}`
    }
  }


  convertDate(value: Date) {
    const date = new Date(value);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}/${date.getFullYear()}`;
  }
}
