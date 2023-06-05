import { Component, OnInit } from '@angular/core';
import { HousingOverview } from 'src/app/models/housing';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-housing-list',
  templateUrl: './housing-list.component.html',
  styleUrls: ['./housing-list.component.css']
})
export class HousingListComponent implements OnInit {

  constructor(private housingSvc: HousingService) {
    housingSvc.getAllForUser(JSON.parse(sessionStorage.getItem('user')).username).subscribe({
        next: (housing) => {
            this.allHousing = housing;
        },
        error: (err) => {
            console.log(err);
        }
    })
   }

  ngOnInit(): void {
  }

  // all properties owned by logged-in user
  allHousing!: HousingOverview[];
}
