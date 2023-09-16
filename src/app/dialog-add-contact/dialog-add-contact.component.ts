import { Component, ViewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Contact } from 'src/models/contact.class';
import { ContactServiceService } from '../services/contact-service/contact-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlagServiceService } from '../services/flag-service/flag-service.service';
import { UtilityServiceService } from '../services/utility-service/utility-service.service';



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
  next_interaction!: Date;
  notes: string;
  picker2: any;
  countries: any = this.flagservice.returnArray();
  newCategory!: String;
  selectedValue!: String;
  days: any = Array(31).fill(0).map((x, i) => i + 1);
  periods: any = [
    {
      value: 1, viewValue: 'Days'
    },
    {
      value: 7, viewValue: 'Weeks'
    },
    {
      value: 30, viewValue: 'Months'
    }
  ]
  category: any = [
    {
      value: 'private', viewValue: 'Private'
    },
    {
      value: 'business', viewValue: 'Business'
    }
  ];
  @ViewChild('documentEditForm') documentEditForm!: FormGroupDirective;

  constructor(public dialogRef: MatDialogRef<DialogAddContactComponent>, private contactservice: ContactServiceService, private snackBar: MatSnackBar, private flagservice: FlagServiceService, private utilityservice: UtilityServiceService) { }

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
    this.calculateNextInteraction();
    if (this.notes) this.contact.notes.push(this.utilityservice.setNote(this.notes));
    if (this.birthDate) this.contact.birthDate = this.birthDate.getTime();
    if (this.contact.last_interaction) this.contact.last_interaction = this.last_interaction.getTime();
    if (this.next_interaction) this.contact.next_interaction = this.next_interaction.getTime();
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

  calculateNextInteraction() {
    if (this.contact.reminder_period && this.contact.reminder_qty && this.contact.last_interaction !== 0) {
      const days = this.utilityservice.calculateDays(this.contact.reminder_qty, this.contact.reminder_period.value);
      this.next_interaction = this.calculateFutureDate(this.last_interaction, days);
    }
  }

  calculateFutureDate(date: any, days: any) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }
}
