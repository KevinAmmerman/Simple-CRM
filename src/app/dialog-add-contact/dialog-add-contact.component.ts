import { Component, ViewChild, inject } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { FormGroupDirective } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { addDoc, collection } from 'firebase/firestore';
import { Contact } from 'src/models/contact.class';


@Component({
  selector: 'app-dialog-add-contact',
  templateUrl: './dialog-add-contact.component.html',
  styleUrls: ['./dialog-add-contact.component.scss']
})
export class DialogAddContactComponent {

  contact = new Contact();
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

  constructor(private dialogRef: MatDialogRef<DialogAddContactComponent>, private firestore: Firestore = inject(Firestore)) { }

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

  saveContact() {
    this.contact.birthDate = this.birthDate ? this.birthDate.getTime() : 0;
    this.dialogRef.close();
    const itemCollection = collection(this.firestore, 'contacts');
    // setDoc(doc(itemCollection), this.contact.toJson());
    addDoc(itemCollection, this.contact.toJson());
  }
}
