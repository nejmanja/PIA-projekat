import { Component, OnInit } from '@angular/core';
import { RegistrationRequest } from 'src/app/models/registration-request';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-registration-requests',
  templateUrl: './registration-requests.component.html',
  styleUrls: ['./registration-requests.component.css'],
})
export class RegistrationRequestsComponent implements OnInit {
  requests!: RegistrationRequest[];
  constructor(private reqService: RequestService) {}

  ngOnInit(): void {
    this.reqService.getRegistrationRequests().subscribe({
      next: (data) => {
        this.requests = data;
      },
    });
  }

  approve(username: string) {
    this.reqService.approveRegistration(username).subscribe({
      next: (data) => {
        this.requests = this.requests.filter((req) => req.username != username);
      },
    });
  }
  ban(username: string) {
    this.reqService.banUser(username).subscribe({
      next: (data) => {
        this.requests = this.requests.filter((req) => req.username != username);
      },
    });
  }
}
