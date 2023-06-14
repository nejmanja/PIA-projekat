import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginSignupService {
  constructor(private http: HttpClient) {}

  uri = 'http://localhost:4000';

  login(formUsername, formPassword) {
    const data = {
      username: formUsername,
      password: formPassword,
    };

    return this.http.post(`${this.uri}/users/login`, data);
  }

  adminLogin(formUsername, formPassword) {
    const data = {
      username: formUsername,
      password: formPassword,
    };

    return this.http.post(`${this.uri}/users/adminLogin`, data);
  }

  register(formData) {
    console.log(formData.profilePic);
    return this.http.post(
      `${this.uri}/requests/register`,
      { ...formData },
      { observe: 'response' }
    );
  }
  addOne(formData) {
    console.log(formData.profilePic);
    return this.http.post(
      `${this.uri}/users/register`,
      { ...formData },
      { observe: 'response' }
    );
  }

  changePassword(username: string, oldPassword: string, newPassword: string) {
    return this.http.put(
      `${this.uri}/users/changePassword`,
      { username, oldPassword, newPassword },
      { observe: 'response' }
    );
  }
}
