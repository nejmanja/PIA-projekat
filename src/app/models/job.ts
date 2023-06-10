export class JobOverview{
    _id: string;
    username: string;
    agency: string;
    housing: string;
    status: string;
    housingData: {
        address: string;
    }
    agencyData: {
        agencyName: string;
    }
}