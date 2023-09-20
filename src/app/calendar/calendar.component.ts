import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ContactServiceService } from '../services/contact-service/contact-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ReminderService } from '../services/reminder-service/reminder.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  contacts$: Observable<any>;
  calendarEvents: any[] = [];
  dataLoaded = false;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: this.handleDateClick.bind(this),
    events: [],
    height: 'auto',
  };

  constructor(private contactService: ContactServiceService, private snackBar: MatSnackBar, private reminderServince: ReminderService) { }

  async ngOnInit() {
    this.contacts$ = await this.contactService.getContacts();
    this.contacts$.subscribe((contacts: any) => {
      this.calendarEvents = contacts
        .filter((contact: any) => contact.next_interaction > new Date().getTime())
        .map((events: any) => {
          return { title: `${events.firstName} ${events.lastName}`, date: this.convertDate(events.next_interaction) }
        });
      this.calendarOptions.events = this.calendarEvents;
      this.dataLoaded = true;
    });
  }

  convertDate(timestamp: Date) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr)
  }
}
