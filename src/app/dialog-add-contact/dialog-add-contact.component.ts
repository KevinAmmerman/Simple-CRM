import { Component, ViewChild, inject } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Contact } from 'src/models/contact.class';
import { ContactServiceService } from '../services/contact-service/contact-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dialog-add-contact',
  templateUrl: './dialog-add-contact.component.html',
  styleUrls: ['./dialog-add-contact.component.scss']
})
export class DialogAddContactComponent {

  contact = new Contact();
  loading: boolean = false;
  birthDate!: Date;
  newCategory!: String;
  selectedValue!: String;
  days: any = Array(31).fill(0).map((x, i) => i);
  periods: any = ['Days', 'Weeks', 'Months']
  category: any = [
    {
      value: 'private', viewValue: 'Private'
    },
    {
      value: 'business', viewValue: 'Business'
    }
  ];
  @ViewChild('documentEditForm') documentEditForm!: FormGroupDirective;

  constructor(private dialogRef: MatDialogRef<DialogAddContactComponent>, private contactservice: ContactServiceService, private snackBar: MatSnackBar) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

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
    if (this.periods.includes(event.value)) {
      this.contact.reminder_period = event.value.toLocaleLowerCase();
    } else if (this.days.includes(event.value)) {
      this.contact.reminder_qty = event.value;
    } else {
      this.contact.category = event.value;
      this.selectedValue = event.value;
    }
  }

  async saveContact() {
    this.contact.birthDate = this.birthDate ? this.birthDate.getTime() : 0;
    try {
      this.loading = true;
      await this.contactservice.setContact(this.contact);
      this.loading = false;
      this.dialogRef.close();
      this.snackBar.open('Contact successfully created', 'close', {duration: 3000});
    } catch (error) {
      this.loading = false;
      this.snackBar.open('Something went wrong', 'close', {duration: 3000});
    }
  }
}
