import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkProposalComponent } from './work-proposal.component';

describe('WorkProposalComponent', () => {
  let component: WorkProposalComponent;
  let fixture: ComponentFixture<WorkProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkProposalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
