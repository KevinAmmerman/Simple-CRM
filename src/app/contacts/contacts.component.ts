import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddContactComponent } from '../dialog-add-contact/dialog-add-contact.component';
import { ContactServiceService } from '../services/contact-service/contact-service.service';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {

  contacts$ = this.contactService.getContacts();
  displayedColumns: string[] = ['firstName', 'last_interaction', 'category', 'phone', 'email', 'reminder_period'];
  dataSource: any;



  constructor(public dialog: MatDialog, private contactService: ContactServiceService) { }

  async ngOnInit() {
    (await this.contacts$).subscribe((contacts: any) => {
      contacts.forEach((contact: any) => {
        contact.last_interaction = this.convertDate(contact.last_interaction)
        contact.reminder_period = this.interval(contact.reminder_qty, contact.reminder_period);
      });
      this.dataSource = contacts;
    })
  }

  interval(qty: Number, period: String) {
    if (qty == 1) {
      if (period == 'Days') {
        period = 'day';
      } else if (period == 'Weeks') {
        period = 'week';
      } else {
        period = 'month'
      }
      return `${qty} ${period}`;
    } else {
      return `${qty} ${period}`
    }
  }

  convertDate(value: Date) {
    const date = new Date(value);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}/${date.getFullYear()}`;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddContactComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
