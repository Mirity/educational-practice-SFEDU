import View from "./view.js";
import { IView } from "../abstracts/common";
import ServiceRecordEntity from "../models/entity/service-record-entity.js";


const template = 'service-records';

export default class ServiceRecordsView extends View implements IView {
    serviceRecords: ServiceRecordEntity[] | null = null;

    constructor() {
        super(template);
    }

    public setServiceRecords(serviceRecords: ServiceRecordEntity[]): this {
        this.serviceRecords = serviceRecords;

        return this;
    }

    public getServiceRecords(): null | ServiceRecordEntity[] {
        return this.serviceRecords;
    }
}

