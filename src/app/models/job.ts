export class JobOverview{
    _id: string;
    owner: string;
    agency: string;
    housingId: string;
    status: string;
    compensation: number;
    roomStatus: Array<boolean>;
    housingData: {
        address: string;
    }
    agencyData: {
        agencyName: string;
    }
}