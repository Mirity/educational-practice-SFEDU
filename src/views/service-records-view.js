import View from "./view.js";

const template = 'service-records';

export default class ServiceRecordsView extends View {
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

