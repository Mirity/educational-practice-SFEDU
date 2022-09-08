import AbstractView from "./abstract-view.js";

const template = 'service-records';

export default class ServiceRecordsView extends AbstractView{
    constructor() {
        super(template);

        this.serviceRecords = [
            {
                id: 1,
                masterId: 1,
                carId: 1,
                clientId: 1,
                date: new Date('December 17, 1995 03:24:00'),
            },
            {
                id: 2,
                masterId: 2,
                carId: 2,
                clientId: 2,
                date: new Date('November 11, 2001 12:25:00'),
            },
            {
                id: 3,
                masterId: 3,
                carId: 3,
                clientId: 3,
                date: new Date('May 1, 2020 10:14:00'),
            },
        ]
    }

    getServiceRecords () {
        return this.serviceRecords;
    }
}

