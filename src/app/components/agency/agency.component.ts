import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Agency, AgencyOverview } from 'src/app/models/agency';
import { Review } from 'src/app/models/review';
import { User } from 'src/app/models/user';
import { AgencyService } from 'src/app/services/agency.service';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css'],
})
export class AgencyComponent implements OnInit {
  agency!: Agency;
  reviews!: Review[];
  reviewers = new Map<string, string>();
  loggedIn!: boolean;
  constructor(
    private route: ActivatedRoute,
    private agencySvc: AgencyService,
    private userSvc: UserService,
    private reviewSvc: ReviewService
  ) {}

  ngOnInit(): void {
    this.loggedIn = sessionStorage.getItem('user') != null;
    const username = String(this.route.snapshot.params['username']);
    this.agencySvc.getOneFull(username).subscribe({
      next: (data) => {
        this.agency = data;
      },
      error: (err) => {},
    });
    // let them both occur at once :D
    this.reviewSvc.getAllForAgency(username).subscribe({
      next: (data) => {
        this.reviews = data;
        this.reviews.forEach((review) => {
          if (this.loggedIn)
            this.userSvc.getOne(review.user).subscribe({
              next: (data) => {
                this.reviewers.set(data.username, data.profilePic);
              },
            });
        });
      },
    });
  }

  generateSeq(len: number) {
    return Array(len);
  }
}
