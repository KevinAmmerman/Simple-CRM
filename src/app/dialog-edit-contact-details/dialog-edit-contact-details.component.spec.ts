import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditContactDetailsComponent } from './dialog-edit-contact-details.component';

describe('DialogEditContactDetailsComponent', () => {
  let component: DialogEditContactDetailsComponent;
  let fixture: ComponentFixture<DialogEditContactDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditContactDetailsComponent]
    });
    fixture = TestBed.createComponent(DialogEditContactDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
