import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Contact } from 'src/models/contact.class';
import { ContactServiceService } from '../services/contact-service/contact-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectChange } from '@angular/material/select';
import { FlagServiceService } from '../services/flag-service/flag-service.service';

@Component({
  selector: 'app-dialog-edit-contact-info',
  templateUrl: './dialog-edit-contact-info.component.html',
  styleUrls: ['./dialog-edit-contact-info.component.scss']
})
export class DialogEditContactInfoComponent {

  loading: boolean = false;
  contactId: string;
  contact: Contact;
  countries: any = this.flagservice.returnArray();
  selectedValueCountry!: String;
  selectedValueCategory!: String;
  category: any = [
    {
      value: 'private', viewValue: 'Private'
    },
    {
      value: 'business', viewValue: 'Business'
    }
  ];
  newCategory!: String;

  constructor(private snackBar: MatSnackBar, private contactservice: ContactServiceService, public dialogRef: MatDialogRef<DialogEditContactInfoComponent>, private flagservice: FlagServiceService) { }

  ngOnInit(): void {
    this.selectedValueCategory = this.contact.category;
    this.selectedValueCountry = this.contact.country;
  }

  onValueChange(event: MatSelectChange) {
    if (this.countries.includes(event.value)) {
      this.contact.country = event.value;
    } else {
      this.contact.category = event.value;
      this.selectedValueCountry = event.value;
    }
  }

  addToCategories() {
    this.category.unshift({
      value: this.newCategory.toLocaleLowerCase(),
      viewValue: this.newCategory
    });
    this.selectedValueCategory = this.newCategory.toLocaleLowerCase();
    this.contact.category = this.newCategory;
    this.newCategory = '';
  }

  async saveContact() {
    try {
      this.loading = true;
      await this.contactservice.updateContact(this.contactId, this.contact);;
      this.loading = false;
      this.dialogRef.close();
      this.snackBar.open('Contact Info successfully edited', 'close', { duration: 3000 });
    } catch (error) {
      this.loading = false;
      this.snackBar.open('Something went wrong', 'close', { duration: 3000 });
    }
  }
}
