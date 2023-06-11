import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Worker } from 'src/app/models/worker';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-worker-details',
  templateUrl: './worker-details.component.html',
  styleUrls: ['./worker-details.component.css'],
})
export class WorkerDetailsComponent implements OnInit {
  @Input() worker: Worker;
  @Output() removed = new EventEmitter<boolean>();
  modifiedWorker: Worker;
  editing: boolean = false;
  constructor(private workerSvc: WorkerService) {}

  ngOnInit(): void {
    this.modifiedWorker = JSON.parse(JSON.stringify(this.worker));
  }
  editClicked(): void {
    this.editing = true;
  }
  deleteClicked(): void {
    console.log(this.worker);
    this.workerSvc.removeOne(this.worker._id).subscribe({
      next: (data) => {
        this.removed.emit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  saveClicked(): void {
    if (
      this.worker.agency != this.modifiedWorker.agency ||
      this.worker.email != this.modifiedWorker.email ||
      this.worker.name != this.modifiedWorker.name ||
      this.worker.surname != this.modifiedWorker.surname ||
      this.worker.phoneNum != this.modifiedWorker.phoneNum
    ) {
      this.workerSvc.updateOne(this.modifiedWorker).subscribe({
        next: (data) => {
          this.worker = JSON.parse(JSON.stringify(this.modifiedWorker));
          this.editing = false;
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.editing = false;
    }
  }
}
