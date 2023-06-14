import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Agency } from 'src/app/models/agency';
import { AgencyService } from 'src/app/services/agency.service';

@Component({
  selector: 'app-agency-profile',
  templateUrl: './agency-profile.component.html',
  styleUrls: ['./agency-profile.component.css'],
})
export class AgencyProfileComponent implements OnInit {
  agency!: Agency;
  imgData: string = '';
  pfpErr: boolean = false;
  backendErr: string = '';
  editing = {
    agencyName: false,
    country: false,
    city: false,
    street: false,
    desc: false,
    email: false,
    phone: false,
    profilePic: false,
  };

  form = new FormGroup({
    agencyName: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    phone: new FormControl('', [
      Validators.pattern(/^06[0-9]{7,8}$/),
      Validators.required,
    ]),
    profilePic: new FormControl(''),
  });

  constructor(
    private agencySvc: AgencyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const username =
      this.route.snapshot.params['username'] != null
        ? this.route.snapshot.params['username']
        : JSON.parse(sessionStorage.getItem('user')).username;

    this.agencySvc.getOneFull(username).subscribe({
      next: (usr) => {
        this.agency = usr;
        // set default form values upon fetching from DB
        this.form.patchValue({
          agencyName: usr.agencyName,
          country: usr.country,
          city: usr.city,
          street: usr.street,
          desc: usr.desc,
          email: usr.email,
          phone: usr.phoneNum,
        });
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
      this.form.get('agencyName').value != this.agency?.agencyName ||
      this.form.get('country').value != this.agency?.country ||
      this.form.get('city').value != this.agency?.city ||
      this.form.get('street').value != this.agency?.street ||
      this.form.get('desc').value != this.agency?.desc ||
      this.form.get('email').value != this.agency?.email ||
      this.form.get('phone').value != this.agency?.phoneNum ||
      this.imgData != this.agency?.profilePic
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
          console.log(img.width, img.height);
          if (this.pfpErr) this.imgData = this.agency.profilePic;
          else this.imgData = img.src;
        };
      };
    }
  }

  onSubmit() {
    const newAgencyName = this.form.get('agencyName').value;
    const newCountry = this.form.get('country').value;
    const newCity = this.form.get('city').value;
    const newStreet = this.form.get('street').value;
    const newDesc = this.form.get('desc').value;
    const newEmail = this.form.get('email').value;
    const newPhone = this.form.get('phone').value;
    // send only the data that actually changed, especially importnat for pfp
    const updatedAgency: Agency = {
      username: this.agency.username,
      agencyName:
        newAgencyName != this.agency.agencyName ? newAgencyName : null,
      country: newCountry != this.agency.country ? newCountry : null,
      city: newCity != this.agency.city ? newCity : null,
      street: newStreet != this.agency.street ? newStreet : null,
      desc: newDesc != this.agency.desc ? newDesc : null,
      email: newEmail != this.agency.email ? newEmail : null,
      phoneNum: newPhone != this.agency.phoneNum ? newPhone : null,
      profilePic: this.imgData != this.agency.profilePic ? this.imgData : null,
      workplaces: null,
    };
    console.log('Submitted!');
    this.agencySvc
      .updateOne(
        this.agency.username,
        updatedAgency
      )
      .subscribe({
        next: (data) => {
          // update user data locally too, no need to fetch from db
          this.agency.agencyName = newAgencyName;
          this.agency.country = newCountry;
          this.agency.city = newCity;
          this.agency.street = newStreet;
          this.agency.desc = newDesc;
          this.agency.email = newEmail;
          this.agency.phoneNum = newPhone;
          this.agency.profilePic = this.imgData;
          this.form.patchValue({
            agencyName: this.agency.agencyName,
            country: this.agency.country,
            city: this.agency.city,
            street: this.agency.street,
            desc: this.agency.desc,
            email: this.agency.email,
            phone: this.agency.phoneNum,
          });
          this.editing = {
            agencyName: false,
            country: false,
            city: false,
            street: false,
            desc: false,
            email: false,
            phone: false,
            profilePic: false,
          };
        },
        error: (err) => {
          console.log(err);
          this.backendErr = err.error['msg'];
        },
      });
  }
}
