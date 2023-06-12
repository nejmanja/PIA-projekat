export class JobOverview{
    _id: string;
    owner: string;
    agency: string;
    housingId: string;
    status: string;
    housingData: {
        address: string;
    }
    agencyData: {
        agencyName: string;
    }
}