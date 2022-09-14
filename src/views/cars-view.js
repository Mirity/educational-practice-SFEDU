import AbstractView from "./abstract-view.js";

const template = 'cars';


export default class CarsView extends AbstractView {
    constructor() {
        super(template);
        this.cars = null;
    }

    setCars(cars) {
        this.cars = cars;

        return this;
    }

    getCars() {
        return this.cars;
    }
}
