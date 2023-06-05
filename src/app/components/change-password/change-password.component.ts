import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginSignupService } from 'src/app/services/login-signup.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  constructor(private loginSignupSvc: LoginSignupService, private router: Router) {}

  ngOnInit(): void {}

  createPasswordValidator() {
    return (group: AbstractControl): ValidationErrors | null => {
      let pass = group?.get('newPassword')?.value;
      let confirmPass = group.get('repeatNewPassword')?.value;
      return pass !== confirmPass ? { notSame: true } : null;
    };
  }

  form = new FormGroup(
    {
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z]{1}[a-zA-Z0-9!@#$%^&*]{6,11}$/
        ),
      ]),
      repeatNewPassword: new FormControl('', Validators.required),
    },
    this.createPasswordValidator()
  );

  get oldPasswordErr() {
    return (
      (this.form.get('oldPassword').dirty ||
        this.form.get('oldPassword').touched) &&
      this.form.get('oldPassword').errors
    );
  }
  get newPasswordErr() {
    return (
      (this.form.get('newPassword').dirty ||
        this.form.get('newPassword').touched) &&
      this.form.get('newPassword').errors
    );
  }
  get repeatNewPasswordErr() {
    return (
      (this.form.get('repeatNewPassword').dirty ||
        this.form.get('repeatNewPassword').touched) &&
        this.form.errors?.['notSame']
    );
  }

  formValid(){
    return this.form.valid;
  }

  backendErr: string = '';
  backendMsg: string = '';
  onSubmit(){
    const username:string = JSON.parse(sessionStorage.getItem('user')).username;
    
    this.loginSignupSvc.changePassword(username, this.form.get('oldPassword').value, this.form.get('newPassword').value).subscribe({
        next: (resp) => {
          if (resp.status === 200) {
            this.backendMsg = 'Uspešna promena lozinke!';
            this.backendErr = '';
            this.router.navigate(['/logout']);
          }
        },
        error: (err) => {
          // separate error handler :o
          this.backendErr = err.error['msg'];
          this.backendMsg = '';
        },
      });
  }
}
