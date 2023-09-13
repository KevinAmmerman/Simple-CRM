import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditReminderComponent } from './dialog-edit-reminder.component';

describe('DialogEditReminderComponent', () => {
  let component: DialogEditReminderComponent;
  let fixture: ComponentFixture<DialogEditReminderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditReminderComponent]
    });
    fixture = TestBed.createComponent(DialogEditReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
