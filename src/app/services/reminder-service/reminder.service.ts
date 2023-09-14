import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor() { }

  checkNextInteraction(nextInt: Date,) {
    const today = new Date();
    const nextInterDate = new Date(nextInt);
    const differenceInMilliseconds = nextInterDate.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    return differenceInDays;
  }
}
