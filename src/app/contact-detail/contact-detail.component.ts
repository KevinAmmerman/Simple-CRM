import { Component } from '@angular/core';
import { ContactServiceService } from '../services/contact-service/contact-service.service';
import { ActivatedRoute } from '@angular/router';
import { UtilityServiceService } from '../services/utility-service/utility-service.service';
import { FlagServiceService } from '../services/flag-service/flag-service.service';
import { Contact } from 'src/models/contact.class';

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

  constructor(private contactservice: ContactServiceService, private route: ActivatedRoute, private utilityservice: UtilityServiceService, private flagservice: FlagServiceService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.contactId = params['id']
      this.contactservice.getSingleContact(this.contactId).subscribe(contact => {
        contact['birthDate'] = this.utilityservice.convertDate(contact['birthDate']);
        contact['last_interaction'] = this.utilityservice.convertDate(contact['last_interaction']);
        let countryCode = this.flagservice.countryCodes[contact['country']];
        this.flag = countryCode ? `https://www.countryflagicons.com/FLAT/64/${countryCode}.png` : '';
        this.contactDetails = new Contact(contact);
        console.log(contact)
      })
    });
  }

  saveNote() {
    let note = this.utilityservice.setNote(this.notes);
    this.contactDetails.notes.push(note);
    this.contactservice.updateContact(this.contactId, this.contactDetails);
    this.notes = '';
  }
}
