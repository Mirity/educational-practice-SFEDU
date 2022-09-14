import AbstractView from "./abstract-view.js";

const template = 'service-center';

export default class ServiceCenterView extends AbstractView{
    constructor() {
        super(template);
        this.serviceCenter = null;
    }

    setServiceCenter(serviceCenter) {
        this.serviceCenter = serviceCenter;

        return this;
    }

    getServiceCenter() {
        return this.serviceCenter;
    }
}

