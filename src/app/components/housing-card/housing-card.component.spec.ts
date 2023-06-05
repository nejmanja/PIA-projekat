import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingCardComponent } from './housing-card.component';

describe('HousingCardComponent', () => {
  let component: HousingCardComponent;
  let fixture: ComponentFixture<HousingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousingCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
