import View from "./view.js";

const template = 'car';

export default class CarView extends View{
    constructor() {
        super(template);
        this.car = null;
    }

    getCar() {
        return this.car;
    }

    setCar(car) {
        this.car = car;

        return this;
    }
}