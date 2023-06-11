import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Worker } from '../models/worker';

@Injectable({
  providedIn: 'root',
})
export class WorkerService {
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getForAgency(username: string) {
    return this.http.get<Worker[]>(`${this.uri}/workers?username=${username}`);
  }

  updateOne(worker: Worker) {
    return this.http.patch(`${this.uri}/workers`, { worker });
  }
  addOne(worker: Worker) {
    return this.http.post(`${this.uri}/workers`, { worker });
  }
  removeOne(id: String) {
    return this.http.delete(`${this.uri}/workers?id=${id}`);
  }
}
