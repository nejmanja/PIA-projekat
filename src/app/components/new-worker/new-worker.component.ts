import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Worker } from 'src/app/models/worker';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-new-worker',
  templateUrl: './new-worker.component.html',
  styleUrls: ['./new-worker.component.css'],
})
export class NewWorkerComponent implements OnInit {
    @Output() done = new EventEmitter<boolean>();
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

  ngOnInit(): void {}

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

  saveClicked() {
    this.workerSvc
      .addOne({
        _id: null,
        agency: JSON.parse(sessionStorage.getItem('user')).username,
        name: this.form.get('name').value,
        surname: this.form.get('surname').value,
        speciality: this.form.get('speciality').value,
        email: this.form.get('email').value,
        phoneNum: this.form.get('phoneNum').value,
      })
      .subscribe({
        next: (data) => {
          this.done.emit(true);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  cancelClicked(){
    this.done.emit(false);
  }
}
