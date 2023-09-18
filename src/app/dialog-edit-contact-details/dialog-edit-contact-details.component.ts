import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactServiceService } from '../services/contact-service/contact-service.service';
import { Contact } from 'src/models/contact.class';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReminderService } from '../services/reminder-service/reminder.service';

@Component({
  selector: 'app-dialog-edit-contact-details',
  templateUrl: './dialog-edit-contact-details.component.html',
  styleUrls: ['./dialog-edit-contact-details.component.scss']
})
export class DialogEditContactDetailsComponent {

  loading: boolean = false;
  contactId: string;
  birthDate!: Date;
  last_interaction!: Date;
  contact: Contact;

  constructor(private snackBar: MatSnackBar, private contactservice: ContactServiceService, public dialogRef: MatDialogRef<DialogEditContactDetailsComponent>, private reminderservice: ReminderService) { }

  ngOnInit(): void {
    this.birthDate = new Date(this.contact.birthDate);
    this.last_interaction = new Date(this.contact.last_interaction);
  }


  async saveContact() {
    if (this.birthDate) this.contact.birthDate = this.birthDate.getTime();
    if (this.last_interaction) this.contact.last_interaction = this.last_interaction.getTime();
    if (this.contact.next_interaction) this.contact.next_interaction = this.reminderservice.getNextInteractionDate(this.contact, this.contact.last_interaction);
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
