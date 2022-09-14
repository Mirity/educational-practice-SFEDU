import AbstractView from "./abstract-view.js";

const template = 'service-centers';


export default class ServiceCentersView extends AbstractView{
    constructor() {
        super(template);
        this.serviceCenters = null;
    }

    setServiceCenters(serviceCenters) {
        this.serviceCenters = serviceCenters;

        return this;
    }

    getServiceCenters() {
        return this.serviceCenters
    }
}

