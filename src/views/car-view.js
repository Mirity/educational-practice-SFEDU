import AbstractView from "./abstract-view.js";

const template = 'car';

export default class CarView extends AbstractView{
    constructor() {
        super(template);

        this.car = {
            id: 1,
            mileage: 12000,
            brandId: 1,
            model: 'X2',
            countryId: 1,
            clientId: 1,
            yearManufacture: 2001,
        }
    }

    getCar() {
        return this.car;
    }

}
