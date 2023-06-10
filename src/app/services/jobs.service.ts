import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobOverview } from '../models/job';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  uri = 'http://localhost:4000/';

  constructor(private http: HttpClient) {}

  createJobRequest(username: string, agencyUsername: string, housingId: string) {
    return this.http.post(`${this.uri}jobs`, {username, agencyUsername, housingId});
  }
  getAllForUser(username: string) {
    return this.http.get<JobOverview[]>(`${this.uri}jobs?username=${username}`);
  }
}
