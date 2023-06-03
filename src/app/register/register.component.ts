import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  createPasswordValidator(){
    return (group: AbstractControl):  ValidationErrors | null => { 
        let pass = group?.get('password')?.value;
        let confirmPass = group.get('passwordRepeat')?.value;
        return pass !== confirmPass ? {notSame: true} : null
      }
  }
  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z]{1}[a-zA-Z0-9!@#$%^&*]{7,12}$/)]),
    passwordRepeat: new FormControl('', [Validators.required]),
    phone: new FormControl('06',[Validators.pattern(/^06[0-9]{7,8}/), Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    type: new FormControl('', Validators.required),
    client: new FormGroup({
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required)
    }),
    agency: new FormGroup({
        name: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        street: new FormControl('', Validators.required),
        agencyNum: new FormControl('', Validators.required),
        desc: new FormControl('', Validators.required)
    }), 
  }, this.createPasswordValidator())

    // getters for form fields   
  get username() {return this.registerForm.get('username'); }
  get password() {return this.registerForm.get('password'); }
  get passwordRepeat() {return this.registerForm.get('passwordRepeat'); }
  get phone() {return this.registerForm.get('phone'); }
  get email() {return this.registerForm.get('email'); }
  get type() {return this.registerForm.get('type'); }

  get clientName() {return this.registerForm.get('client').get('name')}
  get surname() {return this.registerForm.get('client').get('surname')}

  get agencyName() {return this.registerForm.get('agency').get('name')}
  get country() {return this.registerForm.get('agency').get('country')}
  get city() {return this.registerForm.get('agency').get('city')}
  get street() {return this.registerForm.get('agency').get('street')}
  get agencyNum() {return this.registerForm.get('agency').get('agencyNum')}
  get desc() {return this.registerForm.get('agency').get('desc')}
  
  // validation errors for form fields 
  get usernameErr() {return (this.username.dirty || this.username.touched) && this.username.errors}
  get passwordErr() {return (this.password.dirty || this.password.touched) && this.password.errors}
  get passwordRepeatErr() {return (this.passwordRepeat.dirty || this.passwordRepeat.touched) && this.registerForm.errors?.['notSame']}
  get phoneErr() {return (this.phone.dirty || this.phone.touched) && this.phone.errors}
  get emailErr() {return (this.email.dirty || this.email.touched) && this.email.errors}
  // client-specific
  get nameErr() {return (this.clientName.dirty || this.clientName.touched) && this.clientName.errors}
  get surnameErr() {return (this.surname.dirty || this.surname.touched) && this.surname.errors}
  // agency-specific
  get agencyNameErr() {return (this.agencyName.dirty || this.agencyName.touched) && this.agencyName.errors}
  get countryErr() {return (this.country.dirty || this.country.touched) && this.country.errors}
  get cityErr() {return (this.city.dirty || this.city.touched) && this.city.errors}
  get streetErr() {return (this.street.dirty || this.street.touched) && this.street.errors}
  get agencyNumErr() {return (this.agencyNum.dirty || this.agencyNum.touched) && this.agencyNum.errors}
  get descErr() {return (this.desc.dirty || this.desc.touched) && this.desc.errors}

  
  formValid(): boolean {
    if(this.type == undefined) return false;
    let mainFormValid = false;
    if(this.username.valid && this.password.valid && this.passwordRepeat.valid && this.phone.valid && this.email.valid)
        mainFormValid = true;

    if(this.type.value == 'klijent'){
        return mainFormValid && this.registerForm.get('client').valid;
    }
    else{
        return mainFormValid && this.registerForm.get('agency').valid;
    }
  }

  onSubmit(){

  }
}
