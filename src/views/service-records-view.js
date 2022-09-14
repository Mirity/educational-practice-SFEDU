import AbstractView from "./abstract-view.js";

const template = 'service-records';

export default class ServiceRecordsView extends AbstractView{
    constructor() {
        super(template);
        this.serviceRecords = null;
    }

    setServiceRecords(serviceRecords) {
        this.serviceRecords = serviceRecords;

        return this;
    }

    getServiceRecords () {
        return this.serviceRecords;
    }
}

