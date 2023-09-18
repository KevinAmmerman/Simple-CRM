import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityServiceService {

  constructor() { }


  interval(quantity: number, timePeriod: string) {
    const timeUnits = {
      Day: { singular: 'Day', plural: 'Days' },
      Days: { singular: 'Day', plural: 'Days' },
      Week: { singular: 'Week', plural: 'Weeks' },
      Weeks: { singular: 'Week', plural: 'Weeks' },
      Month: { singular: 'Month', plural: 'Months' },
      Months: { singular: 'Month', plural: 'Months' }
    };
    if (quantity < 1) {
      return '-';
    }
    const unit = timeUnits[timePeriod];

    return quantity === 1 ? unit.singular : unit.plural;
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
