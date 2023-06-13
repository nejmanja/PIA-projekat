import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Housing } from 'src/app/models/housing';
import { Worker } from 'src/app/models/worker';

@Component({
  selector: 'app-house-drawing',
  templateUrl: './house-drawing.component.html',
  styleUrls: ['./house-drawing.component.css'],
})
export class HouseDrawingComponent implements OnInit, OnChanges {
  @ViewChild('drawing', { static: true }) canvas!: ElementRef;
  @Input() housing!: Housing;
  @Input() editable: boolean = false;
  @Input() started: boolean = false;
  @Input() progress: boolean[] = null;
  @Input() workers: Worker[] = null;
  freeWorkers!: Worker[];
  selectedWorkerId: string; // from the UI
  // tell the parent that workers have been assigned and job can now start
  @Output() workersAssigned = new EventEmitter<boolean>(); 
  // tell parent that a room is finished
  @Output() roomFinished = new EventEmitter<number>();
  GRID_SIZE: number = 50; // in pixels
  GRID_BEGIN: number = this.GRID_SIZE; // offset the drawing from the edge
  beginRoom: boolean = false;
  notEnoughWorkers: boolean = false;
  allWorkersAssigned: boolean = false;
  beginX: number = 0;
  beginY: number = 0;
  canvasState: string = '';

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {}

  // detect DB load
  ngOnChanges(changes: SimpleChanges) {
    if (changes['housing']) this.refreshCanvas();
    if (changes['workers']){
        this.freeWorkers = this.workers //?.filter(worker => !worker.jobId);
    }
  }

  initCanvas() {
    // if workers are passed
    this.notEnoughWorkers =
      this.started && this.workers && this.housing.numRooms > this.workers.length;
    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const WIDTH = canvas.width;
      const HEIGHT = canvas.height;

      this.drawGrid(ctx, WIDTH, HEIGHT, this.GRID_SIZE);

      ctx.lineWidth = 2;
      this.housing?.rooms.forEach((rect, ind) => {
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'none';
        if (this.progress != null) {
          ctx.fillStyle =
            this.progress[ind] == true
              ? 'rgba(70, 185, 131, 0.5)'
              : 'rgba(213, 42, 42, 0.5)';
        }
        if (this.notEnoughWorkers) ctx.fillStyle = 'rgba(252,215,54, 0.5)';

        if (this.progress != null || this.notEnoughWorkers)
          ctx.fillRect(
            this.GRID_BEGIN + rect.x * this.GRID_SIZE,
            this.GRID_BEGIN + rect.y * this.GRID_SIZE,
            rect.w * this.GRID_SIZE,
            rect.h * this.GRID_SIZE
          );
        ctx.strokeRect(
          this.GRID_BEGIN + rect.x * this.GRID_SIZE,
          this.GRID_BEGIN + rect.y * this.GRID_SIZE,
          rect.w * this.GRID_SIZE,
          rect.h * this.GRID_SIZE
        );
      });

      this.housing?.doors.forEach((door) => {
        ctx.strokeRect(
          door.x * this.GRID_SIZE + this.GRID_BEGIN + 10,
          door.y * this.GRID_SIZE + this.GRID_BEGIN - 5,
          30,
          45
        );
      });

      if(this.workers){
        ctx.fillStyle = 'white';
        const fontSz = 16;
        ctx.font = `${fontSz}px Arial`;

        // how many worker in every room?
        let numNames = Array<number>(this.housing?.numRooms);
        for (let i = 0; i < numNames.length; i++) {
            numNames[i] = 1;
        }
        this.workers.forEach((worker) => {
            if(worker.roomInd >= 0){
                const room = this.housing.rooms[worker.roomInd];
                const x = room.x * this.GRID_SIZE + this.GRID_BEGIN;
                const y = room.y * this.GRID_SIZE + this.GRID_BEGIN + numNames[worker.roomInd]*(fontSz + 2);
                numNames[worker.roomInd]++;
                ctx.fillText(worker.name + ' - ' + worker.speciality,x,y);
            }
        })

        // if all rooms have a worker, the agency can mark rooms as finished
        this.allWorkersAssigned = !numNames.some(num => num == 1);
      }
    }
  }

  refreshCanvas() {
    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, 800, 600);
    }

    this.initCanvas();
  }

  drawGrid(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    gridSize: number
  ) {
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x < w / gridSize; x++) {
      // vertical lines
      ctx.moveTo(x * gridSize, 0);
      ctx.lineTo(x * gridSize, h);
    }
    for (let y = 0; y < h / gridSize; y++) {
      // vertical lines
      ctx.moveTo(0, y * gridSize);
      ctx.lineTo(w, y * gridSize);
    }
    ctx.strokeStyle = 'rgb(100,100,100)';
    ctx.stroke();
  }

  private xToMeter(pos) {
    return Math.min(
      Math.max(
        Math.round(
          ((800 / this.GRID_SIZE) * pos) / this.canvas.nativeElement.clientWidth
        ),
        1
      ),
      15
    );
  }
  private yToMeter(pos) {
    return Math.min(
      Math.max(
        Math.round(
          ((600 / this.GRID_SIZE) * pos) /
            this.canvas.nativeElement.clientHeight
        ),
        1
      ),
      15
    );
  }

  private xToMeterFloat(pos) {
    return (
      ((800 / this.GRID_SIZE) * pos) / this.canvas.nativeElement.clientWidth
    );
  }
  private yToMeterFloat(pos) {
    return (
      ((600 / this.GRID_SIZE) * pos) / this.canvas.nativeElement.clientHeight
    );
  }

  private posToWall(posX, posY) {
    let newPos = { x: -1, y: -1 };
    for (let i = 0; i < this.housing.rooms.length; i++) {
      const room = this.housing.rooms[i];

      if (
        posX < room.x + room.w &&
        posX > room.x &&
        posY < room.y + 0.5 &&
        posY > room.y - 0.5
      ) {
        newPos = {
          x: Math.round(posX - 0.5),
          y: room.y - 0.5,
        };
      } else if (
        posX < room.x + room.w &&
        posX > room.x &&
        posY < room.y + room.h + 0.5 &&
        posY > room.y + room.h - 0.5
      ) {
        newPos = {
          x: Math.round(posX - 0.5),
          y: room.y + room.h - 0.5,
        };
      } else if (
        posY < room.y + room.h &&
        posY > room.y &&
        posX < room.x + 0.5 &&
        posX > room.x - 0.5
      ) {
        newPos = {
          x: room.x - 0.5,
          y: Math.round(posY - 0.5),
        };
      } else if (
        posY < room.y + room.h &&
        posY > room.y &&
        posX < room.x + room.w + 0.5 &&
        posX > room.x + room.w - 0.5
      ) {
        newPos = {
          x: room.x + room.w - 0.5,
          y: Math.round(posY - 0.5),
        };
      }
    }
    return newPos;
  }

  private drawRoom(ctx, x, y) {
    ctx.strokeRect(
      Math.min(x, this.beginX) * this.GRID_SIZE,
      Math.min(y, this.beginY) * this.GRID_SIZE,
      Math.abs(x - this.beginX) * this.GRID_SIZE,
      Math.abs(y - this.beginY) * this.GRID_SIZE
    );
  }

  canvasHovered(event) {
    switch (this.canvasState) {
      case 'addRoom':
        this.addRoomHover(event);
        break;
      case 'removeRoom':
        this.highlightRoom(event);
        break;
      case 'addDoor':
        break;
      case 'addWorker':
        this.highlightRoom(event);
        break;
      case 'finishRoom':
        this.highlightRoom(event);
        break;
    }
  }

  canvasClicked(event) {
    switch (this.canvasState) {
      case 'addRoom':
        this.addRoomClick(event);
        this.refreshCanvas();
        break;
      case 'removeRoom':
        this.removeRoomClick(event);
        this.refreshCanvas();
        break;
      case 'addDoor':
        this.addDoorClick(event);
        this.refreshCanvas();
        break;
      case 'removeDoor':
        this.removeDoorClick(event);
        this.refreshCanvas();
        break;
      case 'addWorker':
        this.addWorkerClick(event);
        this.refreshCanvas();
        break;
      case 'finishRoom':
        this.finishRoomClick(event);
        this.refreshCanvas();
        break;
    }
  }

  setCanvasState(newState: string) {
    this.canvasState = newState;
  }

  addRoomClick(event) {
    // max 3 rooms
    if (this.housing.numRooms >= 3) return;
    // in "meters"
    let posX = this.xToMeter(event.offsetX);
    let posY = this.yToMeter(event.offsetY);

    console.log(posX, posY);

    if (!this.beginRoom) {
      let collision: boolean = false;
      // if colliding with any other rooms, deny the new room
      this.housing.rooms.forEach((room) => {
        if (
          posX < room.x + room.w &&
          posX > room.x &&
          posY < room.y + room.h &&
          posY > room.y
        ) {
          collision = true;
          return;
        }
      });
      if (collision) return;

      this.beginRoom = true;
      this.beginX = posX;
      this.beginY = posY;
    } else {
      let newRoom = {
        x: Math.min(this.beginX, posX) - 1,
        y: Math.min(this.beginY, posY) - 1,
        w: Math.abs(this.beginX - posX),
        h: Math.abs(this.beginY - posY),
      };
      if (newRoom.h === 0 || newRoom.w === 0) return;
      let collision: boolean = false;
      // if colliding with any other rooms, deny the new room
      this.housing.rooms.forEach((room) => {
        if (
          newRoom.x < room.x + room.w &&
          newRoom.x + newRoom.w > room.x &&
          newRoom.y < room.y + room.h &&
          newRoom.y + newRoom.h > room.y
        ) {
          collision = true;
          return;
        }
      });
      if (collision) return;

      this.beginRoom = false;
      this.housing.rooms.push(newRoom);
      this.housing.area += newRoom.h * newRoom.w;
      this.housing.numRooms++;
    }
  }

  removeRoomClick(event) {
    // nothing to remove
    if (this.housing.numRooms <= 0) return;
    // in "meters", but floating point
    let posX = this.xToMeterFloat(event.offsetX) - 1;
    let posY = this.yToMeterFloat(event.offsetY) - 1;

    this.housing.rooms = this.housing.rooms.filter((room) => {
      if (
        posX < room.x + room.w &&
        posX > room.x &&
        posY < room.y + room.h &&
        posY > room.y
      ) {
        this.housing.area -= room.h * room.w;
        return false;
      } else return true;
    });
    this.housing.numRooms = this.housing.rooms.length;

    this.housing.doors = this.housing.doors.filter((door) => {
      let wallGoesThrough = false;
      this.housing.rooms.forEach((room) => {
        // upper edge
        wallGoesThrough =
          wallGoesThrough ||
          (door.x >= room.x &&
            door.x < room.x + room.w &&
            door.y == room.y - 0.5);
        // lower edge
        wallGoesThrough =
          wallGoesThrough ||
          (door.x >= room.x &&
            door.x < room.x + room.w &&
            door.y == room.y + room.h - 0.5);
        // left edge
        wallGoesThrough =
          wallGoesThrough ||
          (door.y >= room.y &&
            door.y < room.y + room.h &&
            door.x == room.x - 0.5);
        // right edge
        wallGoesThrough =
          wallGoesThrough ||
          (door.y >= room.y &&
            door.y < room.y + room.h &&
            door.x == room.x + room.w - 0.5);
      });
      return wallGoesThrough;
    });
  }

  private posHasDoor(x, y) {
    return (
      this.housing.doors.find((door) => door.x == x && door.y == y) != undefined
    );
  }

  addDoorClick(event) {
    let x =
      ((800 / this.GRID_SIZE) * event.offsetX) /
        this.canvas.nativeElement.clientWidth -
      1;
    let y =
      ((600 / this.GRID_SIZE) * event.offsetY) /
        this.canvas.nativeElement.clientHeight -
      1;
    const { x: posX, y: posY } = this.posToWall(x, y);
    if (posX < 0) return;
    if (!this.posHasDoor(posX, posY))
      this.housing.doors.push({ x: posX, y: posY });
    console.log(posX, posY);
    console.log(this.housing.doors);
  }

  removeDoorClick(event) {
    // nothing to remove
    if (this.housing.doors.length == 0) return;

    let x =
      ((800 / this.GRID_SIZE) * event.offsetX) /
        this.canvas.nativeElement.clientWidth -
      1;
    let y =
      ((600 / this.GRID_SIZE) * event.offsetY) /
        this.canvas.nativeElement.clientHeight -
      1;
    const { x: posX, y: posY } = this.posToWall(x, y);
    console.log(this.housing.doors);
    console.log(posX, posY);
    if (posX > 0)
      this.housing.doors = this.housing.doors.filter(
        (door) => !(door.x == posX && door.y == posY)
      );
  }

  addWorkerClick(event) {
    let x = this.xToMeterFloat(event.offsetX) - 1;
    let y = this.yToMeterFloat(event.offsetY) - 1;

    const roomInd = this.housing.rooms.findIndex(
        (room) =>
          x < room.x + room.w && x > room.x && y < room.y + room.h && y > room.y
      );
    
    if(roomInd >= 0){
        let worker = this.workers.find(worker => worker._id == this.selectedWorkerId);
        worker.roomInd = roomInd; // pass-by-ref, updates the parent well
    }
  }
  finishRoomClick(event){
    let x = this.xToMeterFloat(event.offsetX) - 1;
    let y = this.yToMeterFloat(event.offsetY) - 1;

    const roomInd = this.housing.rooms.findIndex(
        (room) =>
          x < room.x + room.w && x > room.x && y < room.y + room.h && y > room.y
      );
    
    if(roomInd >= 0){
        this.progress[roomInd] = true;
        this.roomFinished.emit(roomInd);
    }
  }

  addRoomHover(event) {
    if (!this.beginRoom) return;
    // in "meters"
    let posX = this.xToMeter(event.offsetX);
    let posY = this.yToMeter(event.offsetY);

    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    this.refreshCanvas();
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = 'rgb(255, 100, 100)';
      this.drawRoom(ctx, posX, posY);
    }
  }

  highlightRoom(event) {
    let x = this.xToMeterFloat(event.offsetX) - 1;
    let y = this.yToMeterFloat(event.offsetY) - 1;

    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    this.refreshCanvas();
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'rgb(255, 255, 255, 0.25)';

      const room = this.housing.rooms.find(
        (room) =>
          x < room.x + room.w && x > room.x && y < room.y + room.h && y > room.y
      );
      if (room)
        ctx.fillRect(
          room.x * this.GRID_SIZE + this.GRID_BEGIN,
          room.y * this.GRID_SIZE + this.GRID_BEGIN,
          room.w * this.GRID_SIZE,
          room.h * this.GRID_SIZE
        );
      else this.refreshCanvas();
    }
  }

  confirmWorkerAssignment(){
    this.workersAssigned.emit(true);
  }
}
