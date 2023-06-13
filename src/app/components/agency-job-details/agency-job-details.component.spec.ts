import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyJobDetailsComponent } from './agency-job-details.component';

describe('AgencyJobDetailsComponent', () => {
  let component: AgencyJobDetailsComponent;
  let fixture: ComponentFixture<AgencyJobDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyJobDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
