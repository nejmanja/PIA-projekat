import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  editing: boolean = false;
  constructor(private workerSvc: WorkerService) {}

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    speciality: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNum: new FormControl('', [
      Validators.required,
      Validators.pattern(/^06[0-9]{7,8}$/),
    ]),
  });
  ngOnInit(): void {
    this.form.setValue({
      name: this.worker.name,
      surname: this.worker.surname,
      speciality: this.worker.speciality,
      email: this.worker.email,
      phoneNum: this.worker.phoneNum,
    });
  }
  get nameErr() {
    return (
      (this.form.get('name').dirty || this.form.get('name').touched) &&
      !this.form.get('name').valid
    );
  }
  get surnameErr() {
    return (
      (this.form.get('surname').dirty || this.form.get('surname').touched) &&
      !this.form.get('surname').valid
    );
  }
  get specialityErr() {
    return (
      (this.form.get('speciality').dirty ||
        this.form.get('speciality').touched) &&
      !this.form.get('speciality').valid
    );
  }
  get emailErr() {
    return (
      (this.form.get('email').dirty || this.form.get('email').touched) &&
      !this.form.get('email').valid
    );
  }
  get phoneNumErr() {
    return (
      (this.form.get('phoneNum').dirty || this.form.get('phoneNum').touched) &&
      !this.form.get('phoneNum').valid
    );
  }
  editClicked(): void {
    this.editing = true;
  }
  deleteClicked(): void {
    if (
      this.worker.agency != JSON.parse(sessionStorage.getItem('user')).username
    )
      this.workerSvc.adminRemoveOne(this.worker._id).subscribe({
        next: (data) => {
          this.removed.emit(true);
        },
        error: (err) => {
          console.log(err);
        },
      });
    else
      this.workerSvc.removeOne(this.worker._id).subscribe({
        next: (data) => {
          this.removed.emit(true);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  saveClicked(): void {
    if (
      this.worker.email != this.form.get('email').value ||
      this.worker.name != this.form.get('name').value ||
      this.worker.name != this.form.get('speciality').value ||
      this.worker.surname != this.form.get('surname').value ||
      this.worker.phoneNum != this.form.get('phoneNum').value
    ) {
      const worker: Worker = {
        _id: this.worker._id,
        agency: this.worker.agency,
        name: this.form.get('name').value,
        surname: this.form.get('surname').value,
        speciality: this.form.get('speciality').value,
        email: this.form.get('email').value,
        phoneNum: this.form.get('phoneNum').value,
        jobId: this.worker.jobId,
        roomInd: this.worker.roomInd,
      };
      this.workerSvc.updateOne(worker).subscribe({
        next: (data) => {
          this.worker = JSON.parse(JSON.stringify(worker));
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
