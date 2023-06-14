import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Agency } from 'src/app/models/agency';
import { Worker } from 'src/app/models/worker';
import { AgencyService } from 'src/app/services/agency.service';
import { RequestService } from 'src/app/services/request.service';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css'],
})
export class WorkersComponent implements OnInit {
  agency!: Agency;
  workers!: Worker[];
  backendMsg: string = '';
  adding: boolean = false;
  admin: boolean = false;

  form = new FormGroup({
    numWorkers: new FormControl(0, [Validators.min(1), Validators.required]),
  });

  constructor(
    private agencySvc: AgencyService,
    private reqSvc: RequestService,
    private workerSvc: WorkerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const username =
      this.route.snapshot.params['username'] != null
        ? this.route.snapshot.params['username']
        : JSON.parse(sessionStorage.getItem('user')).username;
    if (this.route.snapshot.params['username'] != null) this.admin = true;
    this.agencySvc.getOneFull(username).subscribe({
      next: (data) => {
        this.agency = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.workerSvc.getForAgency(username).subscribe({
      next: (data) => {
        this.workers = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    this.reqSvc
      .addWorkplaceRequest(
        this.agency.username,
        this.form.get('numWorkers').value
      )
      .subscribe({
        next: (data) => {
          this.backendMsg = 'Zahtev uspešno poslat!';
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  changeState(state: string) {
    if (state == 'add') {
      this.adding = true;
    }
  }

  doneAdding() {
    this.workerSvc.getForAgency(this.agency.username).subscribe({
      next: (data) => {
        this.workers = data;
        if (!this.admin) this.agency.workplaces -= 1;
        this.adding = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removedOne(status: boolean) {
    if (status == true) {
      this.workerSvc.getForAgency(this.agency.username).subscribe({
        next: (data) => {
          this.workers = data;
          if (!this.admin) this.agency.workplaces += 1;
          this.adding = false;
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.adding = false;
    }
  }
}
