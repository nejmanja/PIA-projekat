import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  login(formUsername, formPassword){
    const data = {
        username: formUsername,
        password: formPassword
    }

    return this.http.post(`${this.uri}/users/login`, data);
  }

  register(formData){
    return this.http.post(`${this.uri}/users/register`, {...formData}, {observe: 'response'});
  }
}
