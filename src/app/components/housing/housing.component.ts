import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Housing } from 'src/app/models/housing';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-housing',
  templateUrl: './housing.component.html',
  styleUrls: ['./housing.component.css'],
})
export class HousingComponent implements OnInit {
  housing!: Housing;
  
  constructor(
    private housingSvc: HousingService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.housingSvc.getOne(this.route.snapshot.params['id']).subscribe({
      next: (data) => {
        this.housing = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });}
}
