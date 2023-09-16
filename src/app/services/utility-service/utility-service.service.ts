import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityServiceService {

  constructor() { }


  interval(qty: number, period: string) {
    if (qty === 1) {
      switch (period) {
        case 'Days':
          period = 'Day';
          break;
        case 'Weeks':
          period = 'Week';
          break;
        default:
          period = 'Month';
      }
    } else if (qty < 1) {
      return '-';
    }
    return period;
  }
  

  calculateDays(qty: number, period: number) {
    const days = qty * period;
    return days;
  }


  convertDate(value: Date) {
    const date = new Date(value);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}/${date.getFullYear()}`;
  }


  setNote(notes: string) {
    let note = {
      note: notes,
      date: this.convertDate(new Date())
    }
    return note;
  }
}
