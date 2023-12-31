import { Component } from '@angular/core';
import { Contact } from 'src/models/contact.class';
import { MatSelectChange } from '@angular/material/select';
import { MatDialogRef } from '@angular/material/dialog';
import { ContactServiceService } from '../services/contact-service/contact-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReminderService } from '../services/reminder-service/reminder.service';
import { UtilityServiceService } from '../services/utility-service/utility-service.service';

@Component({
  selector: 'app-dialog-edit-reminder',
  templateUrl: './dialog-edit-reminder.component.html',
  styleUrls: ['./dialog-edit-reminder.component.scss']
})
export class DialogEditReminderComponent {

  loading: boolean = false;
  contactId: string;
  contact: Contact;
  days: any = Array(31).fill(0).map((x, i) => i);
  periods: any = [
    {
      value: 1, viewValue: 'Day'
    },
    {
      value: 7, viewValue: 'Week'
    },
    {
      value: 30.44, viewValue: 'Month'
    }
  ];
  selectedValueDays!: number;
  selectedValuePeriod!: string;

  constructor(private snackBar: MatSnackBar, public dialogRef: MatDialogRef<DialogEditReminderComponent>, private contactservice: ContactServiceService, private reminderservice: ReminderService, private utilityservice: UtilityServiceService) { }

  ngOnInit(): void {
    this.selectedValueDays = this.contact.reminder_qty;
    this.selectedValuePeriod = this.transformPeriodForMenu(this.contact.reminder_qty, this.contact.reminder_period.viewValue);
  }

  transformPeriodForMenu(qty: number, period: string) {
    let newPeriod = this.utilityservice.interval(qty, period)
    switch (newPeriod) {
      case 'Days':
        this.periods[0].viewValue = newPeriod;
        return newPeriod;
        break;
      case 'Weeks':
        this.periods[1].viewValue = newPeriod;
        return newPeriod;
        break;
      case 'Months':
        this.periods[2].viewValue = newPeriod;
        return newPeriod;
      default:
        return newPeriod;
    }
  }

  onValueChange(event: MatSelectChange) {
    const selectedPeriod = this.periods.find((period: any) => period.viewValue === event.value);
    if (selectedPeriod) {
      this.contact.reminder_period = selectedPeriod;
    } else if (this.days.includes(event.value)) {
      this.contact.reminder_qty = event.value;
      this.toggleSingularPlural(event.value);
    }
  }


  toggleSingularPlural(quantity: number) {
    const timeUnits = [
      { singular: 'Day', plural: 'Days' },
      { singular: 'Week', plural: 'Weeks' },
      { singular: 'Month', plural: 'Months' },
    ];
    const key = quantity === 1 ? 'singular' : 'plural';

    for (let i = 0; i < timeUnits.length; i++) {
      this.periods[i].viewValue = timeUnits[i][key];
    }
  }
  

  checkNextInteraction(contact: any) {
    contact.next_interaction = this.reminderservice.getNextInteractionDate(contact, contact.last_interaction);
  }

  async saveContact() {
    this.checkNextInteraction(this.contact);
    try {
      this.loading = true;
      await this.contactservice.updateContact(this.contactId, this.contact);;
      this.loading = false;
      this.dialogRef.close();
      this.snackBar.open('Reminder successfully edited', 'close', { duration: 3000 });
    } catch (error) {
      this.loading = false;
      this.snackBar.open('Something went wrong', 'close', { duration: 3000 });
    }
  }

}
