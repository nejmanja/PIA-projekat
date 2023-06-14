import { Component, OnInit } from '@angular/core';
import { JobOverview } from 'src/app/models/job';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-admin-jobs',
  templateUrl: './admin-jobs.component.html',
  styleUrls: ['./admin-jobs.component.css'],
})
export class AdminJobsComponent implements OnInit {
  jobs!: JobOverview[];

  constructor(private jobSvc: JobsService) {}

  ngOnInit(): void {
    this.jobSvc.getAll().subscribe({
      next: (data) => {
        this.jobs = data;
      },
    });
  }
}
