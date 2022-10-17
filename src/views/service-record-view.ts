import View from "./view.js";
import { ServiceRecord } from "../abstracts/service-record";
import { IView } from "../abstracts/common";


const template = 'service-record';

export default class ServiceRecordView extends View implements IView {
    serviceRecord: ServiceRecord | null = null;

    constructor() {
        super(template);
    }

    public setServiceRecord(serviceRecord: ServiceRecord): this {
        this.serviceRecord = serviceRecord;

        return this;
    }

    public getServiceRecord(): null | ServiceRecord {
        return this.serviceRecord;
    }
}

