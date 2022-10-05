import View from "./view.js";

const template = 'service-record';

export default class ServiceRecordView extends View {
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

