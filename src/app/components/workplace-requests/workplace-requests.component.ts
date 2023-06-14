import { Component, OnInit } from '@angular/core';
import { WorkplaceRequest } from 'src/app/models/workplace-request';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-workplace-requests',
  templateUrl: './workplace-requests.component.html',
  styleUrls: ['./workplace-requests.component.css'],
})
export class WorkplaceRequestsComponent implements OnInit {
  requests!: WorkplaceRequest[];
  constructor(private reqSvc: RequestService) {}

  ngOnInit(): void {
    this.reqSvc.getWorkplaceRequests().subscribe({
      next: (data) => {
        this.requests = data;
      },
    });
  }

  approve(id: string) {
    this.reqSvc.approveWorkplaces(id).subscribe({
        next: (data) => {
          this.requests = this.requests.filter(req => req._id != id);
        },
    })
  }
  deny(id: string) {
    this.reqSvc.denyWorkplaces(id).subscribe({
        next: (data) => {
          this.requests = this.requests.filter(req => req._id != id);
        },
    })}
}
