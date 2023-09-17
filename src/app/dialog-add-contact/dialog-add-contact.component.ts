import { Component, ViewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Contact } from 'src/models/contact.class';
import { ContactServiceService } from '../services/contact-service/contact-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlagServiceService } from '../services/flag-service/flag-service.service';
import { UtilityServiceService } from '../services/utility-service/utility-service.service';
import { ReminderService } from '../services/reminder-service/reminder.service';



@Component({
  selector: 'app-dialog-add-contact',
  templateUrl: './dialog-add-contact.component.html',
  styleUrls: ['./dialog-add-contact.component.scss']
})
export class DialogAddContactComponent {

  contact = new Contact();
  loading: boolean = false;
  birthDate!: Date;
  last_interaction!: Date;
  next_interaction!: number;
  notes: string;
  picker2: any;
  countries: any = this.flagservice.returnArray();
  newCategory!: string;
  selectedValue!: string;
  days: any = Array(31).fill(0).map((_, i) => i + 1);
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
  category: any = [
    {
      value: 'private', viewValue: 'Private'
    },
    {
      value: 'business', viewValue: 'Business'
    }
  ];
  @ViewChild('documentEditForm') documentEditForm!: FormGroupDirective;

  constructor(public dialogRef: MatDialogRef<DialogAddContactComponent>, private contactservice: ContactServiceService, private snackBar: MatSnackBar, private flagservice: FlagServiceService, private utilityservice: UtilityServiceService, private reminderservice: ReminderService) { }

  addToCategories() {
    this.category.unshift({
      value: this.newCategory.toLocaleLowerCase(),
      viewValue: this.newCategory
    });
    this.selectedValue = this.newCategory.toLocaleLowerCase();
    this.contact.category = this.newCategory;
    this.newCategory = '';
  }

  onValueChange(event: MatSelectChange) {
    const selectedPeriod = this.periods.find((period: any) => period.viewValue === event.value);
    if (selectedPeriod) {
      this.contact.reminder_period = selectedPeriod;
    } else if (this.days.includes(event.value)) {
      this.contact.reminder_qty = event.value;
    } else if (this.countries.includes(event.value)) {
      this.contact.country = event.value;
    } else {
      this.contact.category = event.value;
      this.selectedValue = event.value;
    }
  }

  async saveContact() {
    if (this.last_interaction && this.contact.reminder_period && this.contact.reminder_qty) {
      this.contact.next_interaction = this.reminderservice.getNextInteractionDate(this.contact, this.last_interaction);
    };
    if (this.notes) this.contact.notes.push(this.utilityservice.setNote(this.notes));
    if (this.birthDate) this.contact.birthDate = this.birthDate.getTime();
    if (this.last_interaction) this.contact.last_interaction = this.last_interaction.getTime();
    try {
      this.loading = true;
      await this.contactservice.setContact(this.contact);
      this.loading = false;
      this.dialogRef.close();
      this.snackBar.open('Contact successfully created', 'close', { duration: 3000 });
    } catch (error) {
      this.loading = false;
      this.snackBar.open('Something went wrong', 'close', { duration: 3000 });
    }
  }
}
