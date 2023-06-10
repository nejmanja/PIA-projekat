import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Housing, HousingOverview } from '../models/housing';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  uri = "http://localhost:4000/";
  constructor(private http: HttpClient) { }

  getAllForUser(username: string){
    return this.http.get<HousingOverview[]>(`${this.uri}housing?username=${username}`);
  }

  getOne(_id: string){
    return this.http.get<Housing>(`${this.uri}housing/id?id=${_id}`);
  }

  removeOne(_id: string){
    return this.http.delete(`${this.uri}housing/id?id=${_id}`);
  }
  
  addOne(housing: Housing){
    return this.http.put(`${this.uri}housing`, housing);
  }

  updateOne(housing: Housing){
    return this.http.patch(`${this.uri}housing/id?id=${housing._id}`, housing);
  }
}
