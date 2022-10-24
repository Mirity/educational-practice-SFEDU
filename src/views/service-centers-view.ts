import View from "./view.js";
import { IView } from "../abstracts/common";
import ServiceCenterEntity from "../models/entity/service-center-entity.js";


const template = 'service-centers';


export default class ServiceCentersView extends View implements IView {
    serviceCenters: ServiceCenterEntity[] | null = null;
    constructor() {
        super(template);
    }

    public setServiceCenters(serviceCenters: ServiceCenterEntity[]): this {
        this.serviceCenters = serviceCenters;

        return this;
    }

    public getServiceCenters(): null | ServiceCenterEntity[] {
        return this.serviceCenters
    }
}

