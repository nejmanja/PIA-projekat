import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agency, AgencyOverview } from '../models/agency';

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

  getOneFull(username: string){
    return this.http.get<Agency>(`${this.uri}/agencies/full?username=${username}`)
  }
  updateOne(username:string, modifiedAgency){
    return this.http.patch(`${this.uri}/agencies?username=${username}`, modifiedAgency);
  }
}
