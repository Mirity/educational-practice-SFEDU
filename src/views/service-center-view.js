import AbstractView from "./abstract-view.js";

const template = 'service-center';

export default class ServiceCenterView extends AbstractView{
    constructor() {
        super(template);
        this.serviceCenter = {};
    }

    setServiceCenter(serviceCenter) {
        this.serviceCenter = serviceCenter;
    }

    getServiceCenter() {
        return this.serviceCenter[0];
    }
}

