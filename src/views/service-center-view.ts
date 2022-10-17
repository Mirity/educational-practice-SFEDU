import View from "./view.js";
import { ServiceCenter } from "../abstracts/service-center";
import { IView } from "../abstracts/common";


const template = 'service-center';

export default class ServiceCenterView extends View implements IView {
    serviceCenter: ServiceCenter | null = null;
    constructor() {
        super(template);
    }

    public setServiceCenter(serviceCenter: ServiceCenter): this {
        this.serviceCenter = serviceCenter;

        return this;
    }

    public getServiceCenter(): null | ServiceCenter {
        return this.serviceCenter;
    }
}

