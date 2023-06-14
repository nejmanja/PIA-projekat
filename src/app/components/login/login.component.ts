import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginSignupService } from 'src/app/services/login-signup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginSignupSvc: LoginSignupService
  ) {
    route.data.subscribe((data) => {
      this.isAdmin = data['admin'];
      this.title = this.isAdmin ? 'Admin Login' : 'Login';
      if (data['fromReg'] != undefined)
        this.title = 'Registracija uspešna! Login';
    });
  }

  ngOnInit(): void {}

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    const us: string = this.username.value;
    const pw: string = this.password.value;
    if (!this.isAdmin) {
      this.loginSignupSvc.login(us, pw).subscribe({
        next: (data) => {
          if (data != null) {
            sessionStorage.setItem(
              'user',
              JSON.stringify({ username: us, password: pw, type: data['type'] })
            );
            this.router.navigate(['']);
          } else {
            this.msg = 'Pogrešni kredencijali, pokušajte ponovo!';
          }
        },
        error: (err) => {
          this.msg = 'Došlo je do greške, pokušajte ponovo!';
        },
      });
    }
    else{
        this.loginSignupSvc.adminLogin(us, pw).subscribe({
            next: (data) => {
                if (data != null) {
                  sessionStorage.setItem(
                    'user',
                    JSON.stringify({ username: us, password: pw, type: data['type'] })
                  );
                  this.router.navigate(['']);
                } else {
                  this.msg = 'Pogrešni kredencijali, pokušajte ponovo!';
                }
              },
              error: (err) => {
                this.msg = 'Došlo je do greške, pokušajte ponovo!';
              },
        })
    }
  }

  msg: string;
  isAdmin: boolean;
  title: string;
}
