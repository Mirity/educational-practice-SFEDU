import AbstractView from "./abstract-view.js";

export default class ServiceRecordView extends AbstractView{
    constructor() {
        super();
        this.template = 'service-record';

        this.data = {
            id: 1,
            masterId: 1,
            carId: 1,
            clientId: 1,
            date: new Date('December 17, 1995 03:24:00'),
        }
    }
}

