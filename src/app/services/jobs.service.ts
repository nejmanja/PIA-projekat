import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobOverview } from '../models/job';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  createJobRequest(
    username: string,
    agencyUsername: string,
    housingId: string
  ) {
    return this.http.post(`${this.uri}/jobs`, {
      username,
      agencyUsername,
      housingId,
    });
  }
  getAllForUser(username: string) {
    return this.http.get<JobOverview[]>(
      `${this.uri}/jobs?username=${username}`
    );
  }
  getOne(id: string) {
    return this.http.get<JobOverview>(
      `${this.uri}/jobs/id?id=${id}`
    );
  }
  getAllForAgency(username: string) {
    return this.http.get<JobOverview[]>(
      `${this.uri}/jobs/agency?username=${username}`
    );
  }
  deny(id: string) {
    return this.http.patch(`${this.uri}/jobs/deny`, { id });
  }
  sendOffer(id: string, compensation: number) {
    return this.http.patch(`${this.uri}/jobs/accept`, { id, compensation });
  }
}
