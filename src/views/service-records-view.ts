import View from "./view.js";
import { ServiceRecord } from "../abstracts/service-record";
import { IView } from "../abstracts/common";


const template: string = 'service-records';

export default class ServiceRecordsView extends View implements IView {
    serviceRecords: null | ServiceRecord[] = null;

    constructor() {
        super(template);
    }

    public setServiceRecords(serviceRecords: ServiceRecord[]): this {
        this.serviceRecords = serviceRecords;

        return this;
    }

    public getServiceRecords(): null | ServiceRecord[] {
        return this.serviceRecords;
    }
}

