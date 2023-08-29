import { Component } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DialogAddContactComponent } from '../dialog-add-contact/dialog-add-contact.component';
import { Contact } from 'src/models/contact.class';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {

  constructor(public dialog: MatDialog) {}

  ngOnInit() {

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddContactComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
