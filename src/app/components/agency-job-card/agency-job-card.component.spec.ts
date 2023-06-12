import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyJobCardComponent } from './agency-job-card.component';

describe('AgencyJobCardComponent', () => {
  let component: AgencyJobCardComponent;
  let fixture: ComponentFixture<AgencyJobCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyJobCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyJobCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
