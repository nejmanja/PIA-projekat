import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Housing } from 'src/app/models/housing';
import { JobOverview } from 'src/app/models/job';
import { Worker } from 'src/app/models/worker';
import { HousingService } from 'src/app/services/housing.service';
import { JobsService } from 'src/app/services/jobs.service';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-agency-job-details',
  templateUrl: './agency-job-details.component.html',
  styleUrls: ['./agency-job-details.component.css'],
})
export class AgencyJobDetailsComponent implements OnInit {
  job!: JobOverview;
  housing!: Housing;
  workers!: Worker[];

  constructor(
    private jobSvc: JobsService,
    private route: ActivatedRoute,
    private housingSvc: HousingService,
    private workerSvc: WorkerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jobSvc.getOne(this.route.snapshot.params['id']).subscribe({
      next: (data) => {
        this.job = data;

        // if it's done, nothing to view, you can only get here by forcing the url
        if(this.job.status == 'finished')
            this.router.navigateByUrl('/');
        const agencyUsername = JSON.parse(sessionStorage.getItem('user')).username;
        this.workerSvc.getForAgency(agencyUsername).subscribe({
          next: (data) => {
            // TODO: rework this to fetch less stuff from the DB
            this.workers = data.filter(worker => worker.jobId == undefined || worker.jobId == this.job?._id)
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

  jobAssignedToWorkers(event: boolean) {
    // send the updates to DB
    this.workers.forEach((worker) => {
      if (worker.roomInd != undefined) {
        worker.jobId = this.job._id;
        this.workerSvc.updateOne(worker).subscribe({
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
    this.job.status = 'started';
    this.jobSvc.updateStatus(this.job._id, 'started').subscribe({
      error: (err) => {
        console.log(err);
      },
    });
  }

  roomFinished(roomInd: number){
    console.log(`finished room ${roomInd}`)
    this.jobSvc.finishRoom(this.job._id, roomInd).subscribe({
        error: (err) => {
          console.log(err);
        },
      });
  }
}
