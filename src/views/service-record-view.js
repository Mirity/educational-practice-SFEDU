import AbstractView from "./abstract-view.js";

const template = 'service-record';

export default class ServiceRecordView extends AbstractView{
    constructor() {
        super(template);
        this.serviceRecord = null;
    }

    setServiceRecord(serviceRecord) {
        this.serviceRecord = serviceRecord;

        return this;
    }

    getServiceRecord() {
        return this.serviceRecord;
    }
}

