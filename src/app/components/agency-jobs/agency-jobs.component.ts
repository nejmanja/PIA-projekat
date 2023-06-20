import { Component, OnInit } from '@angular/core';
import { JobOverview } from 'src/app/models/job';
import { JobsService } from 'src/app/services/jobs.service';
@Component({
  selector: 'app-agency-jobs',
  templateUrl: './agency-jobs.component.html',
  styleUrls: ['./agency-jobs.component.css'],
})
export class AgencyJobsComponent implements OnInit {
  jobs!: JobOverview[];
  constructor(private jobsSvc: JobsService) {}

  ngOnInit(): void {
    this.jobsSvc
      .getAllForAgency(JSON.parse(sessionStorage.getItem('user')).username)
      .subscribe({
        next: (data) => {
          this.jobs = data;
        },
      });
  }

  denied(id: string) {
    this.jobs = this.jobs.filter((job) => job._id != id);
  }
}
