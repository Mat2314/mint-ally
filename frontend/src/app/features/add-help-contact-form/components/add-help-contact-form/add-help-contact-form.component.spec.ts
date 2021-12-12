import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHelpContactFormComponent } from './add-help-contact-form.component';

describe('AddHelpContactFormComponent', () => {
  let component: AddHelpContactFormComponent;
  let fixture: ComponentFixture<AddHelpContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHelpContactFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHelpContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
