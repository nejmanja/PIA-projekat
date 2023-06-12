import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JobsService } from '../../services/jobs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agency-job-card',
  templateUrl: './agency-job-card.component.html',
  styleUrls: ['./agency-job-card.component.css'],
})
export class AgencyJobCardComponent implements OnInit {
  @Input() job!: any; // modification of the job class due to the join
  @Output() denied = new EventEmitter<string>();
  constructor(private router: Router, private jobSvc: JobsService) {}

  ngOnInit(): void {}

  accept() {
    this.router.navigateByUrl(`/acceptJob/${this.job._id}`);
  }
  deny() {
    this.jobSvc.updateStatus(this.job._id, 'denied').subscribe({
      next: (data) => {
        // emit the id of the removed item, the parent will remove from list, without contacting the DB again for no reason
        this.denied.emit(this.job._id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
