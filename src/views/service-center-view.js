import AbstractView from "./abstract-view.js";

const template = 'service-center';

export default class ServiceCenterView extends AbstractView{
    constructor() {
        super(template);

        this.serviceCenter = {
            id: 1,
            name: 'AutoKrutyak',
            countryId: 1,
            cityId: 1,
            street: 'Boob 2',
            house: 1,
            numberSeats: 12
        }
    }

    getServiceCenter() {
        return this.serviceCenter;
    }
}

