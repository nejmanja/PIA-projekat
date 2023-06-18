import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Housing } from 'src/app/models/housing';
import { JobOverview } from 'src/app/models/job';
import { HousingService } from 'src/app/services/housing.service';
import { JobsService } from 'src/app/services/jobs.service';
import { ReviewService } from 'src/app/services/review.service';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent implements OnInit {
  job!: JobOverview;
  housing!: Housing;
  allDone: boolean = false;

  reviewExists!: boolean;
  rating: number = 0;
  review: string = '';
  editing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private jobSvc: JobsService,
    private housingSvc: HousingService,
    private reviewSvc: ReviewService,
    private workerSvc: WorkerService
  ) {}

  ngOnInit(): void {
    this.jobSvc.getOne(this.route.snapshot.params['id']).subscribe({
      next: (data) => {
        this.job = data;

        this.housingSvc.getOne(this.job.housingId).subscribe({
          next: (data) => {
            this.housing = data;

            this.allDone = true;
            for (let i = 0; i < this.housing.numRooms; i++) {
              if (this.job.roomStatus[i] == false) this.allDone = false;
            }
            console.log(this.allDone);
          },
          error: (err) => {
            console.log(err);
          },
        });

        if (this.job.status == 'finished') {
          this.reviewSvc.getOne(this.job._id).subscribe({
            next: (data) => {
              this.reviewExists = data != null;
              if (this.reviewExists) {
                this.rating = data.rating;
                this.review = data.review;
              }
            },
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  starClick(num: number) {
    this.rating = num;
  }

  payClick() {
    this.workerSvc.jobDone(this.job._id).subscribe({
        error: (err) => {
            console.log(err);
        }
    })

    this.jobSvc.updateStatus(this.job._id, 'finished').subscribe({
      next: (data) => {
        this.job.status = 'finished';

        // let it do its thing asynchronously
        if (this.rating > 0 || this.review != '') {
          this.reviewExists = true;
          this.reviewSvc
            .addOne({
              agency: this.job.agency,
              user: this.job.owner,
              jobId: this.job._id,
              rating: this.rating,
              review: this.review,
            })
            .subscribe({
              error: (err) => {
                console.log(err);
              },
            });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  toggleEditing() {
    this.editing = !this.editing;
  }

  updateReview() {
    if (this.reviewExists) {
      this.reviewSvc
        .updateOne(this.job._id, this.rating, this.review)
        .subscribe({
          next: (data) => {
            this.editing = false;
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      this.reviewSvc
        .addOne({
          agency: this.job.agency,
          user: this.job.owner,
          jobId: this.job._id,
          rating: this.rating,
          review: this.review,
        })
        .subscribe({
          next: (data) => {
            this.editing = false;
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  removeReview() {
    this.reviewSvc.deleteOne(this.job._id).subscribe({
      next: (data) => {
        this.reviewExists = false;
        this.review = '';
        this.rating = 0;
      },
    });
  }
}
