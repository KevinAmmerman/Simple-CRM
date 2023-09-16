import { Injectable } from '@angular/core';
import { UtilityServiceService } from '../utility-service/utility-service.service';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor(private utilityservice: UtilityServiceService) { }

  checkNextInteraction(nextInt: Date,) {
    const today = new Date();
    const nextInterDate = new Date(nextInt);
    const differenceInMilliseconds = nextInterDate.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    return differenceInDays;
  }

  getNextInteractionDate(contact: any, last_interaction: Date) {
    if (contact.reminder_period && contact.reminder_qty && contact.last_interaction !== 0) {
      const days = this.utilityservice.calculateDays(contact.reminder_qty, contact.reminder_period.value);
      const next_interaction = this.calculateFutureDate(last_interaction, days);
      return next_interaction;
    } else {
      return null;
    }
  }

  calculateFutureDate(date: any, days: any) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }
}
