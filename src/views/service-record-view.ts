import View from "./view.js";
import { IView } from "../abstracts/common";
import ServiceRecordEntity from "../models/entity/service-record-entity.js";


const template = 'service-record';

export default class ServiceRecordView extends View implements IView {
    serviceRecord: ServiceRecordEntity | null = null;

    constructor() {
        super(template);
    }

    public setServiceRecord(serviceRecord: ServiceRecordEntity): this {
        this.serviceRecord = serviceRecord;

        return this;
    }

    public getServiceRecord(): null | ServiceRecordEntity {
        return this.serviceRecord;
    }
}

