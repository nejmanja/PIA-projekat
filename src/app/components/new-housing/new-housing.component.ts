import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Housing } from 'src/app/models/housing';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-new-housing',
  templateUrl: './new-housing.component.html',
  styleUrls: ['./new-housing.component.css'],
})
export class NewHousingComponent implements OnInit {
  housing!: Housing;
  backendErr: string = '';
  fileErr: string = '';

  form = new FormGroup({
    type: new FormControl(-1, Validators.required),
    address: new FormControl('', Validators.required),
  });

  constructor(private router: Router, private housingSvc: HousingService) {
    this.housing = {
      _id: '',
      address: '',
      // the whole rooms/doors bit will be auto-updated by the drawing, bless references
      area: 0,
      doors: [],
      numRooms: 0,
      rooms: [],
      owner: JSON.parse(sessionStorage.getItem('user')).username,
      type: 0,
      numOngoingJobs: 0,
    };
  }

  get addressErr() {
    return (
      (this.form.get('address').dirty || this.form.get('address').touched) &&
      !this.form.get('address').valid
    );
  }

  onSubmit() {
    this.housing.type = this.form.get('type').value;
    this.housing.address = this.form.get('address').value;
    this.housingSvc.addOne(this.housing).subscribe({
      next: (data) => {
        this.router.navigateByUrl('/housing');
      },
      error: (err) => {
        this.backendErr = err.error['msg'];
      },
    });
  }

  private checkValidity(housing: Housing): boolean {
    if (!housing.address || housing.address == '') {
      return false;
    }
    if (!housing.rooms || !housing.doors) {
      return false;
    }
    if (housing.type == undefined || (housing.type != 0 && housing.type != 1)) {
      return false;
    }
    housing.numRooms = housing.rooms.length;
    housing.area = 0;
    let dataIncomplete = false;
    housing.rooms.forEach((room) => {
      if (
        room.h == undefined ||
        room.h == 0 ||
        room.w == undefined ||
        room.w == 0 ||
        room.x == undefined ||
        room.y == undefined
      )
        dataIncomplete = true;
      housing.area += room.h * room.w;
    });
    housing.doors.forEach((door) => {
      if (door.x == undefined || door.y == undefined) dataIncomplete = true;
      let notOnWall = true;
      // check whether door is on a wall
      housing.rooms.forEach((room) => {
        if (
          (door.x == room.x - 0.5 &&
            door.y >= room.y &&
            door.y <= room.y + room.h) ||
          (door.x == room.x + room.w - 0.5 &&
            door.y >= room.y &&
            door.y <= room.y + room.h) ||
          (door.y == room.y - 0.5 &&
            door.x >= room.x &&
            door.x <= room.x + room.w) ||
          (door.y == room.y + room.h - 0.5 &&
            door.x >= room.x &&
            door.x <= room.x + room.w)
        )
          notOnWall = false;
      });
      if (notOnWall) dataIncomplete = true;
    });
    return !dataIncomplete;
  }

  onUpload(event) {
    const file = event.target.files[0];
    const fr = new FileReader();
    fr.readAsText(file);
    fr.onload = () => {
      const res: Housing = JSON.parse(fr.result as string);
      if (!this.checkValidity(res)) {
        event.target.value = '';
        event.target.files = null;
        this.fileErr = 'Fajl neispravan!';
        return;
      }

      this.housing = {
        _id: '',
        owner: this.housing.owner,
        address: res.address,
        rooms: res.rooms,
        numRooms: res.numRooms,
        area: res.area,
        doors: res.doors,
        type: res.type,
        numOngoingJobs: 0,
      };
      this.housing.rooms = [...res.rooms];
      this.housing.numRooms = res.numRooms;
      this.housing.doors = [...res.doors];
      this.housing.area = res.area;
      this.housing.type = res.type;
      this.form.patchValue({ type: res.type, address: res.address });
      event.target.value = '';
      event.target.files = null;
      this.fileErr = '';
    };
  }

  ngOnInit(): void {}
}
