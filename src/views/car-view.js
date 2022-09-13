import AbstractView from "./abstract-view.js";

const template = 'car';

export default class CarView extends AbstractView{
    constructor() {
        super(template);
        this.car = {};
    }

    getCar() {
        return this.car[0];
    }

    setCar(car) {
        this.car = car;
    }
}