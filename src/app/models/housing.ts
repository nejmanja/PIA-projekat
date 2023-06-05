export class HousingOverview{
    _id: string;
    owner: string;
    type: number;
    address: string;
    numRooms: number;
    area: number;
}

class Room{
    x: number;
    y: number;
    w: number;
    h: number;
}
class Door{
    x: number;
    y: number;
}

export class Housing{
    _id: string;
    owner: string;
    type: number;
    address: string;
    numRooms: number;
    area: number;
    rooms: Room[];
    doors: Door[];
}