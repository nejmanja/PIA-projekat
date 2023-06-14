import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationRequest } from '../models/registration-request';
import { WorkplaceRequest } from '../models/workplace-request';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  addWorkplaceRequest(agency: string, numWorkplaces: number) {
    return this.http.post(`${this.uri}/requests/workers`, {agency, numWorkplaces});
  }
  getRegistrationRequests() {
    return this.http.get<RegistrationRequest[]>(`${this.uri}/requests/register`);
  }
  getWorkplaceRequests() {
    return this.http.get<WorkplaceRequest[]>(`${this.uri}/requests/workers`);
  }
  approveRegistration(username: string) {
    return this.http.patch(`${this.uri}/requests/registerApprove`, {username});
  }
  banUser(username: string) {
    return this.http.patch(`${this.uri}/requests/ban`, {username});
  }
  approveWorkplaces(id: string) {
    return this.http.patch(`${this.uri}/requests/workersApprove`, {id});
  }
  denyWorkplaces(id: string) {
    return this.http.patch(`${this.uri}/requests/workersDeny`, {id});
  }
}
