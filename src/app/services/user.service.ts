import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getOne(username: string) {
    return this.http.get<User>(`${this.uri}/users?username=${username}`);
  }

  updateOne(username:string, modifiedUser){
    return this.http.patch(`${this.uri}/users?username=${username}`, modifiedUser);
  }

  getAll(){
    return this.http.get<User[]>(`${this.uri}/users/all`);
  }

  deleteOne(username:string){
    return this.http.delete(`${this.uri}/users?username=${username}`);
  }
}
