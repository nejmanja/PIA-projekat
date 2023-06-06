import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseDrawingComponent } from './house-drawing.component';

describe('HouseDrawingComponent', () => {
  let component: HouseDrawingComponent;
  let fixture: ComponentFixture<HouseDrawingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseDrawingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
