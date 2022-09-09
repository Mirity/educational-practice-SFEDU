import AbstractView from "./abstract-view.js";

const template = 'car';

export default class CarView extends AbstractView{
    constructor() {
        super(template);
    }

    getCar() {
        return this.car;
    }

    setCar(car) {
        this.car = car;
    }
}