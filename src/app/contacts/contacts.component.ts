import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddContactComponent } from '../dialog-add-contact/dialog-add-contact.component';
import { ContactServiceService } from '../services/contact-service/contact-service.service';
import { UtilityServiceService } from '../services/utility-service/utility-service.service';
import { ReminderService } from '../services/reminder-service/reminder.service';
import { Contact } from 'src/models/contact.class';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {

  contacts$ = this.contactService.getContacts();
  displayedColumns: string[] = ['firstName', 'last_interaction', 'next_interaction', 'category', 'email', 'reminder_period'];
  dataSource: any = [];
  test: boolean;


  constructor(public dialog: MatDialog, private contactService: ContactServiceService, private utilityservice: UtilityServiceService, private reminderservice: ReminderService, private snackBar: MatSnackBar) { }


  async ngOnInit() {
    (await this.contacts$).subscribe((contacts: any) => {
      contacts.forEach((contact: any) => {
        this.checkNextInteraction(contact);
        contact.nextIntDays = this.reminderservice.checkNextInteractionDaysLeft(contact.next_interaction);
        contact.last_interaction = contact.last_interaction ? this.utilityservice.convertDate(contact.last_interaction) : '-';
        contact.next_interaction = contact.next_interaction ? this.utilityservice.convertDate(contact.next_interaction) : '-';
        contact.reminder_period.viewValue = this.utilityservice.interval(contact.reminder_qty, contact.reminder_period.viewValue);
      });
      this.dataSource = contacts;
    }), (error: any) => {
      this.snackBar.open(`Error retrieving contacts: ${error}`, 'close', { duration: 3000 });
    }
  }

  isTimeForInt(index: number) {
    const boolean = this.dataSource[index].nextIntDays <= 0 ? true : false;
    return boolean;
  }

  checkNextInteraction(contact: any) {
    contact.next_interaction = this.reminderservice.getNextInteractionDate(contact, contact.last_interaction);
  }

  openDialog(): void {
    this.dialog.open(DialogAddContactComponent);
  }
}