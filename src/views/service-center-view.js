import AbstractView from "./abstract-view.js";

export default class ServiceCenterView extends AbstractView{
    constructor() {
        super();
        this.template = 'service-center';

        this.data = {
            id: 1,
            name: 'AutoKrutyak',
            countryId: 1,
            cityId: 1,
            street: 'Boob 2',
            house: 1,
            numberSeats: 12
        }
    }
}

