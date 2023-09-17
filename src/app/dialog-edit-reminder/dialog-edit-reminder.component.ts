import { Component } from '@angular/core';
import { Contact } from 'src/models/contact.class';
import { MatSelectChange } from '@angular/material/select';
import { MatDialogRef } from '@angular/material/dialog';
import { ContactServiceService } from '../services/contact-service/contact-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReminderService } from '../services/reminder-service/reminder.service';

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
      value: 1, viewValue: 'Days'
    },
    {
      value: 7, viewValue: 'Weeks'
    },
    {
      value: 30.44, viewValue: 'Months'
    }
  ];
  selectedValueDays!: number;
  selectedValuePeriod!: string;

  constructor(private snackBar: MatSnackBar, public dialogRef: MatDialogRef<DialogEditReminderComponent>, private contactservice: ContactServiceService, private reminderservice: ReminderService) { }

  ngOnInit(): void {
    this.selectedValueDays = this.contact.reminder_qty;
    this.selectedValuePeriod = this.contact.reminder_period.viewValue;
    console.log(this.contact)
  }

  onValueChange(event: MatSelectChange) {
    const selectedPeriod = this.periods.find((period: any) => period.viewValue === event.value);
    if (selectedPeriod) {
      this.contact.reminder_period = selectedPeriod;
    } else if (this.days.includes(event.value)) {
      this.contact.reminder_qty = event.value;
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
