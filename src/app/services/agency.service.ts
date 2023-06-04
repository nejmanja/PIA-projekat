import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AgencyOverview } from '../models/agency';

@Injectable({
  providedIn: 'root',
})
export class AgencyService {
  uri = 'http://localhost:4000';
  constructor(private http: HttpClient) {}

  getAll(){
    return this.http.get<AgencyOverview[]>(`${this.uri}/agencies`);
  }


  getOne(username: string){
    return this.http.get<AgencyOverview>(`${this.uri}/agencies?username=${username}`)
  }
}
