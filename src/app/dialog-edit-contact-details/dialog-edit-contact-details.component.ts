import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactServiceService } from '../services/contact-service/contact-service.service';
import { Contact } from 'src/models/contact.class';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-edit-contact-details',
  templateUrl: './dialog-edit-contact-details.component.html',
  styleUrls: ['./dialog-edit-contact-details.component.scss']
})
export class DialogEditContactDetailsComponent {

  loading: boolean = false;
  contactId: string;
  birthDate!: Date;
  contact: Contact;

  constructor(private snackBar: MatSnackBar, private route: ActivatedRoute, private contactservice: ContactServiceService, public dialogRef: MatDialogRef<DialogEditContactDetailsComponent>) { }

  ngOnInit(): void {
    this.convertDate();
  }

  convertDate() {
    const dateStr: string = this.contact.birthDate.toString();
    const [monthStr, dayStr, yearStr] = dateStr.split('/');
    const month = Number(monthStr);
    const day = Number(dayStr);
    const year = Number(yearStr);
    this.birthDate = new Date(year, month - 1, day);
  }

  async saveContact() {
    this.contact.birthDate = this.birthDate ? this.birthDate.getTime() : 0;
    try {
      this.loading = true;
      await this.contactservice.updateContact(this.contactId, this.contact);;
      this.loading = false;
      this.dialogRef.close();
      this.snackBar.open('Contact successfully edited', 'close', {duration: 3000});
    } catch (error) {
      this.loading = false;
      this.snackBar.open('Something went wrong', 'close', {duration: 3000});
    }
  }

}
