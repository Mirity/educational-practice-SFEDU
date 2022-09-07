import AbstractView from "./abstract-view.js";

export default class CarView extends AbstractView{
    constructor() {
        super();
        this.template = 'car';

        this.data = {
            id: 1,
            mileage: 12000,
            brandId: 1,
            model: 'X2',
            countryId: 1,
            clientId: 1,
            yearManufacture: 2001,
        }
    }
}
