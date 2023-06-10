import { Component, OnInit } from '@angular/core';
import { JobOverview } from 'src/app/models/job';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnInit {
  jobs!: JobOverview[];
  constructor(private jobsSvc: JobsService) {}

  ngOnInit(): void {
    const username = JSON.parse(sessionStorage.getItem('user')).username;
    this.jobsSvc.getAllForUser(username).subscribe({
      next: (data) => {
        this.jobs = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
