import AbstractView from "./abstract-view.js";

const template = 'cars';


export default class CarsView extends AbstractView {
    constructor() {
        super(template);
        this.cars = {};
    }

    setCars(cars) {
        this.cars = cars;
    }

    getCars() {
        return this.cars;
    }
}
