import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    route.data.subscribe(data => {
        this.isAdmin = data['admin'];
        this.title = this.isAdmin ? "Admin Login" : "Login";
        if(data['fromReg'] != undefined) this.title = "Registracija uspešna! Login"; 
    })
  }

  ngOnInit(): void {}

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit(){
    console.warn(this.loginForm.value);
  }

  isAdmin: boolean;
  title: string;
}
