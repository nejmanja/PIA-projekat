import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgencyOverview } from 'src/app/models/agency';
import { AgencyService } from 'src/app/services/agency.service';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css'],
})
export class AgencyComponent implements OnInit {
  agency!: AgencyOverview;
  constructor(private route: ActivatedRoute, private agencySvc: AgencyService) {
  }

  ngOnInit(): void {
    const username = String(this.route.snapshot.params['username']);
    this.agencySvc.getOne(username).subscribe({next: (data) => {
        this.agency = data[0];
        console.log(data);
    },
    error: (err) => {}});}
}
