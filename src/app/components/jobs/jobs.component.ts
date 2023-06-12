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
  filteredJobs!: JobOverview[];

  filters = {
    finished: false,
    active: false,
    requested: false,
  };

  constructor(private jobsSvc: JobsService) {}

  ngOnInit(): void {
    const username = JSON.parse(sessionStorage.getItem('user')).username;
    this.jobsSvc.getAllForUser(username).subscribe({
      next: (data) => {
        this.jobs = data;
        this.filteredJobs = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  filtersChanged() {
    if (
      !this.filters.finished &&
      !this.filters.active &&
      !this.filters.requested
    ) {
      this.filteredJobs = this.jobs;
      return;
    }
    let final: JobOverview[] = [];
    if (this.filters.finished)
      final = final.concat(
        this.jobs.filter(
          (job) => job.status == 'finished' || job.status == 'denied'
        )
      );
    if (this.filters.active)
      final = final.concat(this.jobs.filter((job) => job.status == 'active'));
    if (this.filters.requested)
      final = final.concat(
        this.jobs.filter(
          (job) => job.status == 'requested' || job.status == 'pending'
        )
      );

    this.filteredJobs = final;
  }

  accepted(id: string) {
    this.jobs.forEach((job) => {
      if (job._id == id) job.status = 'active';
    });
  }

  denied(id: string) {
    console.log(id);
    this.jobs = this.jobs.filter((job) => job._id != id);
    this.filteredJobs = this.filteredJobs.filter((job) => job._id != id);
  }
}
