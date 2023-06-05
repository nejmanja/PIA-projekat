import { Component, Input, OnInit } from '@angular/core';
import { HousingOverview } from 'src/app/models/housing';

@Component({
  selector: 'app-housing-card',
  templateUrl: './housing-card.component.html',
  styleUrls: ['./housing-card.component.css']
})
export class HousingCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() housing!: HousingOverview;
}
