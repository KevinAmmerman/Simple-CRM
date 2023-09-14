import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddContactComponent } from '../dialog-add-contact/dialog-add-contact.component';
import { ContactServiceService } from '../services/contact-service/contact-service.service';
import { UtilityServiceService } from '../services/utility-service/utility-service.service';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {

  contacts$ = this.contactService.getContacts();
  displayedColumns: string[] = ['firstName', 'last_interaction', 'category', 'phone', 'email', 'reminder_period'];
  dataSource: any;



  constructor(public dialog: MatDialog, private contactService: ContactServiceService, private utilityservice: UtilityServiceService) { }

  async ngOnInit() {
    (await this.contacts$).subscribe((contacts: any) => {
      contacts.forEach((contact: any) => {
        contact.last_interaction = this.utilityservice.convertDate(contact.last_interaction)
        contact.reminder_period = this.utilityservice.interval(contact.reminder_qty, contact.reminder_period.viewValue);
      });
      this.dataSource = contacts;
    })
  }

  openDialog(): void {
    this.dialog.open(DialogAddContactComponent);
  }
}
