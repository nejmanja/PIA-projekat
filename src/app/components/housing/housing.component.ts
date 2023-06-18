import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  initialHousing!: Housing;
  backendErr: string = '';
  
  form = new FormGroup({
    type: new FormControl(-1, Validators.required),
    address: new FormControl('', Validators.required),
  });
  editing = {
    type: false,
    address: false,
  }

  constructor(
    private housingSvc: HousingService,
    private route: ActivatedRoute
  ) {
  }

  toggleEditable(prop: string){
    this.editing[prop] = !this.editing[prop];
  }

  private addressDifferent(): boolean {
    return this.form.get('address').value != this.initialHousing.address;
  }
  private typeDifferent(): boolean {
    return this.form.get('type').value != this.initialHousing.type;
  }
  private numRoomsDifferent(): boolean {
    return this.housing.numRooms != this.initialHousing.numRooms;
  }
  private roomsDifferent(): boolean {
    for (let i = 0; i < this.housing.rooms.length; i++) {
        const element = this.housing.rooms[i];
        const cmp = this.initialHousing.rooms[i];
        if(element.x != cmp.x || element.y != cmp.y || element.w != cmp.w || element.h != cmp.h) return true;
    }
    return false;
  }
  private doorsDifferent(): boolean {
    if(this.housing.doors.length != this.initialHousing.doors.length) return true;
    for (let i = 0; i < this.housing.doors.length; i++) {
        const element = this.housing.doors[i];
        const cmp = this.initialHousing.doors[i];
        if(element.x != cmp.x || element.y != cmp.y) return true;
    }
    return false;
  }


  different(): boolean {
    if(this.typeDifferent()) return true;
    if(this.addressDifferent()) return true;
    if(this.numRoomsDifferent()) return true;
    if(this.roomsDifferent()) return true;
    return this.doorsDifferent();
    
  }

  onSubmit(){
    const dataToSend: Housing = {
        _id: this.housing._id,
        owner: this.housing.owner,
        address: this.addressDifferent() ? this.form.get('address').value : null,
        type: this.typeDifferent() ? this.form.get('type').value : null,
        rooms: this.roomsDifferent() ? this.housing.rooms : null,
        numRooms : this.numRoomsDifferent() ? this.housing.numRooms : null,
        doors: this.doorsDifferent() ? this.housing.doors : null,
        area: this.housing.area,
        numOngoingJobs: this.housing.numOngoingJobs
    }

    this.housingSvc.updateOne(dataToSend).subscribe({
        next: (data) => {
            // copy the new data as the init state, no need to refresh
            this.initialHousing = JSON.parse(JSON.stringify(this.housing));
            this.initialHousing.address = this.form.get('address').value;
            this.initialHousing.type = this.form.get('type').value;
        },
        error: (err) => {
            this.backendErr = err.error['msg'];
        }
    })
  }

  ngOnInit(): void {
    this.housingSvc.getOne(this.route.snapshot.params['id']).subscribe({
      next: (data) => {
        this.housing = data;
        this.initialHousing = JSON.parse(JSON.stringify(data)); // truly a js moment
        this.form.setValue({type: this.housing.type, address: this.housing.address});
      },
      error: (err) => {
        console.log(err);
      },
    });}
}
