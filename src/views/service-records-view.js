import AbstractView from "./abstract-view.js";

const template = 'service-records';

export default class ServiceRecordsView extends AbstractView{
    constructor() {
        super(template);
        this.serviceRecords = [];
    }

    setServiceRecords(serviceRecords) {
        this.serviceRecords = serviceRecords;
    }

    getServiceRecords () {
        return this.serviceRecords;
    }
}

