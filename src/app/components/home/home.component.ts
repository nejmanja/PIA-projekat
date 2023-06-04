import { Component, OnInit } from '@angular/core';
import { AgencyOverview } from 'src/app/models/agency';
import { AgencyService } from 'src/app/services/agency.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private agencySvc: AgencyService) {
    agencySvc.getAll().subscribe((data)=>{
        console.log(data);
        this.agencies = data;
    })
   }

  ngOnInit(): void {
  }

  agencies!: AgencyOverview[];
}
