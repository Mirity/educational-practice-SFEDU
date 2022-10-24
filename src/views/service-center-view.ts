import View from "./view.js";
import { IView } from "../abstracts/common";
import ServiceCenterEntity from "../models/entity/service-center-entity.js";


const template = 'service-center';

export default class ServiceCenterView extends View implements IView {
    serviceCenter: ServiceCenterEntity | null = null;
    constructor() {
        super(template);
    }

    public setServiceCenter(serviceCenter: ServiceCenterEntity): this {
        this.serviceCenter = serviceCenter;

        return this;
    }

    public getServiceCenter(): null | ServiceCenterEntity {
        return this.serviceCenter;
    }
}

