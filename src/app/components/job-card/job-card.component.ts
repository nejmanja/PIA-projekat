import { Component, Input, OnInit } from '@angular/core';
import { JobOverview } from 'src/app/models/job';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent implements OnInit {
@Input() job!: JobOverview;
  constructor() { }

  ngOnInit(): void {
  }

}
