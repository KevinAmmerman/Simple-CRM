import { Component } from '@angular/core';
import { ContactServiceService } from '../services/contact-service/contact-service.service';
import { ActivatedRoute } from '@angular/router';
import { UtilityServiceService } from '../services/utility-service/utility-service.service';
import { FlagServiceService } from '../services/flag-service/flag-service.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent {

  public contactDetails: any;
  public flag: string;

  constructor(private contactservice: ContactServiceService, private route: ActivatedRoute, private utilityservice: UtilityServiceService, private flagservice: FlagServiceService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let contactId = params['id']
      this.contactDetails = this.contactservice.getSingleContact(contactId).subscribe(contact => {
        contact['birthDate'] = this.utilityservice.convertDate(contact['birthDate']);
        contact['last_interaction'] = this.utilityservice.convertDate(contact['last_interaction']);
        let countryCode = this.flagservice.countryCodes[contact['country']];
        this.flag = countryCode ? `https://www.countryflagicons.com/FLAT/64/${countryCode}.png` : '';
        this.contactDetails = contact;
        console.log(contact)
      })
    });
  }
}
