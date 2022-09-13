import AbstractView from "./abstract-view.js";

const template = 'service-centers';


export default class ServiceCentersView extends AbstractView{
    constructor() {
        super(template);
        this.serviceCenters = [];
    }

    setServiceCenters(serviceCenters) {
        this.serviceCenters = serviceCenters;
    }

    getServiceCenters() {
        return this.serviceCenters
    }
}

