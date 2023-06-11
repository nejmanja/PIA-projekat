import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  addWorkplaceRequest(agency: string, numWorkplaces: number) {
    return this.http.post(`${this.uri}/requests/workers`, {agency, numWorkplaces});
  }
}
