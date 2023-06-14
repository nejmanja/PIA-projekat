import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Housing } from 'src/app/models/housing';
import { JobOverview } from 'src/app/models/job';
import { Worker } from 'src/app/models/worker';
import { HousingService } from 'src/app/services/housing.service';
import { JobsService } from 'src/app/services/jobs.service';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-admin-job-details',
  templateUrl: './admin-job-details.component.html',
  styleUrls: ['./admin-job-details.component.css'],
})
export class AdminJobDetailsComponent implements OnInit {
  job!: JobOverview;
  workers!: Worker[];
  housing!: Housing;
  constructor(
    private route: ActivatedRoute,
    private jobSvc: JobsService,
    private workerSvc: WorkerService,
    private housingSvc: HousingService
  ) {}

  ngOnInit(): void {
    this.jobSvc.getOne(this.route.snapshot.params['id']).subscribe({
      next: (data) => {
        this.job = data;

        this.workerSvc.getForAgency(data.agency).subscribe({
          next: (data) => {
            // TODO: rework this to fetch less stuff from the DB
            this.workers = data.filter(
              (worker) => worker.jobId == this.job?._id
            );
          },
          error: (err) => {
            console.log(err);
          },
        });

        this.housingSvc.getOne(this.job.housingId).subscribe({
          next: (data) => {
            this.housing = data;
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
