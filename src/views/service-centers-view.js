import View from "./view.js";

const template = 'service-centers';


export default class ServiceCentersView extends View{
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

