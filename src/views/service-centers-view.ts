import View from "./view.js";
import { ServiceCenter } from "../abstracts/service-center.js";
import { IView } from "../abstracts/common";


const template = 'service-centers';


export default class ServiceCentersView extends View implements IView {
    serviceCenters: ServiceCenter[] | null = null;
    constructor() {
        super(template);
    }

    public setServiceCenters(serviceCenters: ServiceCenter[]): this {
        this.serviceCenters = serviceCenters;

        return this;
    }

    public getServiceCenters(): null | ServiceCenter[] {
        return this.serviceCenters
    }
}

