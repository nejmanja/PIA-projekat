import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JobOverview } from 'src/app/models/job';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-admin-job-card',
  templateUrl: './admin-job-card.component.html',
  styleUrls: ['./admin-job-card.component.css'],
})
export class AdminJobCardComponent implements OnInit {
  @Input() job!: JobOverview;
  @Output() accepted = new EventEmitter<string>();
  @Output() denied = new EventEmitter<string>();
  link!: string;
  status!: string;
  constructor(private jobSvc: JobsService) {}

  ngOnInit(): void {
    this.link = `/adminJob/${this.job._id}`;

    //requested/pending/denied/starting/started/finished
    switch (this.job.status) {
      case 'requested':
        this.status = 'Zahtevan';
        break;
      case 'pending':
        this.status = 'Čeka odgovor';
        break;
      case 'denied':
        this.status = 'Odbijen';
        break;
      case 'starting':
        this.status = 'Čeka se početak';
        break;
      case 'started':
        this.status = 'Aktivan';
        break;
      case 'finished':
        this.status = 'Završen';
        break;
    }
  }
}
