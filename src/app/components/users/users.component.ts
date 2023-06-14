import { Component, OnInit } from '@angular/core';
import { AgencyOverview } from 'src/app/models/agency';
import { User } from 'src/app/models/user';
import { AgencyService } from 'src/app/services/agency.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users!: User[];
  agencies!: AgencyOverview[];
  constructor(private userSvc: UserService, private agencySvc: AgencyService) {}

  ngOnInit(): void {
    this.userSvc.getAll().subscribe({
      next: (data) => {
        this.users = data;
      },
    });
    this.agencySvc.getAll().subscribe({
      next: (data) => {
        this.agencies = data;
      },
    });
  }

  onUserRemove(username: string){
    this.userSvc.deleteOne(username).subscribe({
        next: (data) => {
            this.users = this.users.filter(user => user.username != username);
        }
    })
  }

  onAgencyRemove(username: string){
    this.agencySvc.deleteOne(username).subscribe({
        next: (data) => {
            this.agencies = this.agencies.filter(agency => agency.username != username);
        }
    })
  }
}
