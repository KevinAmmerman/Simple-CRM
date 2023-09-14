import { Component } from '@angular/core';
import { ContactServiceService } from '../services/contact-service/contact-service.service';
import { ActivatedRoute } from '@angular/router';
import { UtilityServiceService } from '../services/utility-service/utility-service.service';
import { FlagServiceService } from '../services/flag-service/flag-service.service';
import { Contact } from 'src/models/contact.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditContactDetailsComponent } from '../dialog-edit-contact-details/dialog-edit-contact-details.component';
import { DialogEditReminderComponent } from '../dialog-edit-reminder/dialog-edit-reminder.component';
import { DialogEditContactInfoComponent } from '../dialog-edit-contact-info/dialog-edit-contact-info.component';
import { ReminderService } from '../services/reminder-service/reminder.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent {

  contactDetails: Contact = new Contact();
  public flag: string;
  panelOpenState: boolean = false
  notes: string;
  contactId: string;
  indexNote: string;
  searchValue: string;
  displayedNotes: any;
  nextIntDays: Number;

  constructor(private contactservice: ContactServiceService, private route: ActivatedRoute, private utilityservice: UtilityServiceService, private flagservice: FlagServiceService, public dialog: MatDialog, private reminderservice: ReminderService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.contactId = params['id']
      this.contactservice.getSingleContact(this.contactId).subscribe(contact => {
        contact['birthDate'] = this.utilityservice.convertDate(contact['birthDate']);
        contact['last_interaction'] = this.utilityservice.convertDate(contact['last_interaction']);
        contact['reminder_period'].viewValue = this.utilityservice.interval(contact['reminder_qty'], contact['reminder_period'].viewValue)
        let countryCode = this.flagservice.countryCodes[contact['country']];
        this.flag = countryCode ? `https://www.countryflagicons.com/FLAT/64/${countryCode}.png` : '';
        this.contactDetails = new Contact(contact);
        this.displayedNotes = this.contactDetails.notes;
        this.nextIntDays = this.reminderservice.checkNextInteraction(contact['next_interaction']);
      })
    });
  }

  searchNote() {
    let filteredNotes = this.contactDetails.notes.filter((note: any) => this.checkIfIncluded(note, this.searchValue));
    if (this.searchValue.length > 0) {
      this.displayedNotes = filteredNotes;
    } else {
      this.displayedNotes = this.contactDetails.notes;
    }
  }

  checkIfIncluded(n: any, search: string) {
    return n.date.includes(search) ||
        n.note.toLowerCase().includes(search);
}

  saveNote() {
    let note = this.utilityservice.setNote(this.notes);
    this.contactDetails.notes.push(note);
    this.contactservice.updateContact(this.contactId, this.contactDetails);
    this.notes = '';
    if (this.indexNote !== '') this.deleteNote(this.indexNote);
  }

  editNote(i: any) {
    this.notes = this.contactDetails.notes[i].note;
    this.indexNote = i;
  }

  deleteNote(i: any) {
    this.contactDetails.notes.splice(i, 1);
    this.indexNote = '';
    this.contactservice.updateContact(this.contactId, this.contactDetails);
  } 

  editContactDetails() {
    const dialog = this.dialog.open(DialogEditContactDetailsComponent);
    dialog.componentInstance.contact = new Contact(this.contactDetails.toJson());
    dialog.componentInstance.contactId = this.contactId;
  }

  editReminder() {
    const dialog = this.dialog.open(DialogEditReminderComponent);
    dialog.componentInstance.contact = new Contact(this.contactDetails.toJson());
    dialog.componentInstance.contactId = this.contactId;
  }

  editContactInfo() {
    const dialog = this.dialog.open(DialogEditContactInfoComponent);
    dialog.componentInstance.contact = new Contact(this.contactDetails.toJson());
    dialog.componentInstance.contactId = this.contactId;
  }

  getNextInteractionDate() {
    
  }
}
