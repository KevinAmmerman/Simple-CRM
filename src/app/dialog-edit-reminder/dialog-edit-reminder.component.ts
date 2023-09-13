import { Component } from '@angular/core';
import { Contact } from 'src/models/contact.class';
import { MatSelectChange } from '@angular/material/select';
import { MatDialogRef } from '@angular/material/dialog';
import { ContactServiceService } from '../services/contact-service/contact-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  periods: any = ['Days', 'Weeks', 'Months'];
  selectedValueDays!: Number;
  selectedValuePeriod!: String;

  constructor(private snackBar: MatSnackBar, public dialogRef: MatDialogRef<DialogEditReminderComponent>, private contactservice: ContactServiceService) {}

  ngOnInit(): void {
    this.selectedValueDays = this.contact.reminder_qty;
    this.selectedValuePeriod = this.contact.reminder_period.charAt(0).toUpperCase() + this.contact.reminder_period.slice(1);;
    console.log(this.selectedValuePeriod);
  }

  onValueChange(event: MatSelectChange) {
    if (this.periods.includes(event.value)) {
      this.contact.reminder_period = event.value.toLocaleLowerCase();
    } else if (this.days.includes(event.value)) {
      this.contact.reminder_qty = event.value;
    }
  }

  async saveContact() {
    try {
      this.loading = true;
      await this.contactservice.updateContact(this.contactId, this.contact);;
      this.loading = false;
      this.dialogRef.close();
      this.snackBar.open('Reminder successfully edited', 'close', {duration: 3000});
    } catch (error) {
      this.loading = false;
      this.snackBar.open('Something went wrong', 'close', {duration: 3000});
    }
  }

}
