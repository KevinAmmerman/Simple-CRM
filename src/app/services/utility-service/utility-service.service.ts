import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityServiceService {

  constructor() { }

  interval(qty: Number, period: String) {
    if (qty == 1) {
      if (period == 'Days') {
        period = 'Day';
      } else if (period == 'Weeks') {
        period = 'Week';
      } else {
        period = 'Month'
      }
      return `${period}`;
    } else {
      return `${period}`
    }
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
