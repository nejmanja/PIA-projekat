import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HousingOverview } from 'src/app/models/housing';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-housing-card',
  templateUrl: './housing-card.component.html',
  styleUrls: ['./housing-card.component.css']
})
export class HousingCardComponent implements OnInit {

  constructor(private housingSvc: HousingService, private router: Router) { }

  ngOnInit(): void {
  }

  removeClicked(){
    this.housingSvc.removeOne(this.housing._id).subscribe({
        next: (data) => {
            // emit event only on success!
            this.removedOne.emit(this.housing._id);
        },
        error: (err) =>{
            console.log(err);
        }
    });
  }

  @Input() housing!: HousingOverview;
  @Output() removedOne = new EventEmitter<string>(); // notify the parent that one of the properties got removed
}
