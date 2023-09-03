import { Component } from '@angular/core';
import { ContactServiceService } from '../services/contact-service/contact-service.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent {

  constructor(private contactservice: ContactServiceService) {}
}
