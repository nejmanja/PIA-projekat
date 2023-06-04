import { Component, Input, OnInit } from '@angular/core';
import { AgencyOverview } from 'src/app/models/agency';

@Component({
  selector: 'app-agency-card',
  templateUrl: './agency-card.component.html',
  styleUrls: ['./agency-card.component.css']
})
export class AgencyCardComponent implements OnInit {

  constructor() { 
  }

  ngOnInit(): void {
    if(this.agency.desc.length > 100){
        this.agency.desc = this.agency.desc.substring(0, 100);
        this.agency.desc = this.agency.desc.concat("...");
    }
  }

  @Input() agency!: AgencyOverview;
}
