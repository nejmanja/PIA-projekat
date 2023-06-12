import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JobOverview } from 'src/app/models/job';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent implements OnInit {
@Input() job!: JobOverview;
@Output() accepted = new EventEmitter<string>();
@Output() denied = new EventEmitter<string>();
link!: string;
  constructor(private jobSvc: JobsService) { }

  ngOnInit(): void {
    this.link = `/job/${this.job._id}`;
  }

  accept(){
    this.jobSvc.updateStatus(this.job._id, 'active').subscribe({
        next: (data) => {
            this.accepted.emit(this.job._id);
        },
        error: (err) => {
            console.log(err);
        }
    })
  }

  deny(){
    this.jobSvc.deleteOne(this.job._id).subscribe({
        next: (data) => {
            this.denied.emit(this.job._id);
        },
        error: (err) => {
            console.log(err);
        }
    })

  }
}
