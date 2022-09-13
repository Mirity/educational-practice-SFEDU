import AbstractView from "./abstract-view.js";

const template = 'service-record';

export default class ServiceRecordView extends AbstractView{
    constructor() {
        super(template);
        this.serviceRecord = {};
    }

    setServiceRecord(serviceRecord) {
        this.serviceRecord = serviceRecord;
    }

    getServiceRecord() {
        return this.serviceRecord[0];
    }
}

