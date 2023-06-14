import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJobCardComponent } from './admin-job-card.component';

describe('JobCardComponent', () => {
  let component: AdminJobCardComponent;
  let fixture: ComponentFixture<AdminJobCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminJobCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminJobCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
