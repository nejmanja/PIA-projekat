import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJobDetailsComponent } from './admin-job-details.component';

describe('AdminJobDetailsComponent', () => {
  let component: AdminJobDetailsComponent;
  let fixture: ComponentFixture<AdminJobDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminJobDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
