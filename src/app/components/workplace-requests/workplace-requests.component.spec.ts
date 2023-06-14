import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkplaceRequestsComponent } from './workplace-requests.component';

describe('WorkplaceRequestsComponent', () => {
  let component: WorkplaceRequestsComponent;
  let fixture: ComponentFixture<WorkplaceRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkplaceRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkplaceRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
