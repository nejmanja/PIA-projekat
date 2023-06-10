import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Housing, HousingOverview } from 'src/app/models/housing';
import { HousingService } from 'src/app/services/housing.service';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-work-proposal',
  templateUrl: './work-proposal.component.html',
  styleUrls: ['./work-proposal.component.css'],
})
export class WorkProposalComponent implements OnInit {
  housing!: HousingOverview[];

  constructor(
    private housingSvc: HousingService,
    private jobsSvc: JobsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const username = JSON.parse(sessionStorage.getItem('user')).username;
    this.housingSvc.getAllForUser(username).subscribe({
      next: (data) => {
        this.housing = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    const username = JSON.parse(sessionStorage.getItem('user')).username;
    this.jobsSvc
      .createJobRequest(
        username,
        this.route.snapshot.params['agencyUsername'],
        this.form.get('housing').value
      )
      .subscribe({
        next: (data) => {
          this.router.navigateByUrl('jobs');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  createDateRangeValidator() {
    return (group: AbstractControl): ValidationErrors | null => {
      let startDate: string = group?.get('startDate')?.value;
      let endDate: string = group.get('endDate')?.value;
      return startDate < new Date().toISOString().split('T')[0] ||
        startDate >= endDate
        ? { invalidRange: true }
        : null;
    };
  }

  form = new FormGroup(
    {
      housing: new FormControl('', Validators.required),
      startDate: new FormControl(undefined, Validators.required),
      endDate: new FormControl(undefined, Validators.required),
    },
    [this.createDateRangeValidator()]
  );
}
