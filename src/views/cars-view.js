import View from "./view.js";

const template = 'cars';


export default class CarsView extends View {
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
