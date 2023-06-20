import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user!: User;
  imgData: string = '';
  pfpErr: boolean = false;
  backendErr: string = '';
  editing = {
    name: false,
    surname: false,
    email: false,
    phone: false,
    profilePic: false,
  };

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    phone: new FormControl('', [
      Validators.pattern(/^06[0-9]{7,8}$/),
      Validators.required,
    ]),
    profilePic: new FormControl(''),
  });

  constructor(
    private userSvc: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const username =
      this.route.snapshot.params['username'] != null
        ? this.route.snapshot.params['username']
        : JSON.parse(sessionStorage.getItem('user')).username;
    this.userSvc.getOne(username).subscribe({
      next: (usr) => {
        this.user = usr;
        // set default form values upon fetching from DB
        this.form.get('name').setValue(usr.name);
        this.form.get('surname').setValue(usr.surname);
        this.form.get('email').setValue(usr.email);
        this.form.get('phone').setValue(usr.phoneNum);
        // this.form.get('profilePic').setValue(usr.profilePic);
        this.imgData = usr.profilePic;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  toggleEditable(prop: string) {
    this.editing[prop] = !this.editing[prop];
  }

  isModified() {
    return (
      this.form.get('name').value != this.user?.name ||
      this.form.get('surname').value != this.user?.surname ||
      this.form.get('email').value != this.user?.email ||
      this.form.get('phone').value != this.user?.phoneNum ||
      this.imgData != this.user?.profilePic
    );
  }
  onChange(event: any) {
    const reader = new FileReader();
    if (event.target.files?.length > 0) {
      const file = event.target.files[0];

      // read what was uploaded
      reader.readAsDataURL(file);
      reader.onload = () => {
        // create image
        var img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          // if dimensions are incorrect, log error
          this.pfpErr =
            img.width > 300 ||
            img.width < 100 ||
            img.height > 300 ||
            img.height < 100;
          if (this.pfpErr) this.imgData = this.user.profilePic;
          else this.imgData = img.src;
        };
      };
    }
  }

  onSubmit() {
    const newName = this.form.get('name').value;
    const newSurname = this.form.get('surname').value;
    const newEmail = this.form.get('email').value;
    const newPhone = this.form.get('phone').value;
    // send only the data that actually changed, especially importnat for pfp
    const updatedUser = {
      name: newName != this.user.name ? newName : null,
      surname: newSurname != this.user.surname ? newSurname : null,
      email: newEmail != this.user.email ? newEmail : null,
      phone: newPhone != this.user.phoneNum ? newPhone : null,
      profilePic: this.imgData != this.user.profilePic ? this.imgData : null,
    };
    this.userSvc
      .updateOne(
        this.user.username,
        updatedUser
      )
      .subscribe({
        next: (data) => {
          // update user data locally too, no need to fetch from db
          this.user.name = newName;
          this.user.surname = newSurname;
          this.user.email = newEmail;
          this.user.phoneNum = newPhone;
          this.user.profilePic = this.imgData;
          this.form.get('name').setValue(this.user.name);
          this.form.get('surname').setValue(this.user.surname);
          this.form.get('email').setValue(this.user.email);
          this.form.get('phone').setValue(this.user.phoneNum);
          this.editing = {
            name: false,
            surname: false,
            email: false,
            phone: false,
            profilePic: false,
          };
        },
        error: (err) => {
          this.backendErr = err.error['msg'];
        },
      });
  }
}
