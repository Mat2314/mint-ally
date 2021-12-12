import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHelpContactDialogComponent } from './add-help-contact-dialog.component';

describe('AddHelpContactDialogComponent', () => {
  let component: AddHelpContactDialogComponent;
  let fixture: ComponentFixture<AddHelpContactDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHelpContactDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHelpContactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
