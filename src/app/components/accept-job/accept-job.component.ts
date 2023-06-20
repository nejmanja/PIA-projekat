import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Housing } from 'src/app/models/housing';
import { JobOverview } from 'src/app/models/job';
import { User } from 'src/app/models/user';
import { HousingService } from 'src/app/services/housing.service';
import { JobsService } from 'src/app/services/jobs.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-accept-job',
  templateUrl: './accept-job.component.html',
  styleUrls: ['./accept-job.component.css'],
})
export class AcceptJobComponent implements OnInit {
  job!: JobOverview;
  housing!: Housing;
  owner!: User;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobSvc: JobsService,
    private housingSvc: HousingService,
    private userSvc: UserService
  ) {}

  form = new FormGroup({
    amount: new FormControl(0, [Validators.required, Validators.min(1)]),
  });

  ngOnInit(): void {
    this.jobSvc.getOne(this.route.snapshot.params['id']).subscribe({
      next: (data) => {
        this.job = data;
        this.housingSvc.getOne(this.job.housingId).subscribe({
          next: (data) => {
            this.housing = data;

            this.userSvc.getOne(this.job.owner).subscribe({
              next: (data) => {
                this.owner = data;
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
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  sendOffer() {
    this.jobSvc.sendOffer(this.job._id, this.form.get('amount').value).subscribe({
        next: (data) =>{
            this.router.navigateByUrl('/agencyJobs')
        },
        error: (err) => {
            console.log(err);
        }
    })
  }
}
