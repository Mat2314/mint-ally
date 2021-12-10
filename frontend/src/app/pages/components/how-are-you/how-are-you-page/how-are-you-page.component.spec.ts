import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowAreYouPageComponent } from './how-are-you-page.component';

describe('HowAreYouPageComponent', () => {
  let component: HowAreYouPageComponent;
  let fixture: ComponentFixture<HowAreYouPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowAreYouPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowAreYouPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
