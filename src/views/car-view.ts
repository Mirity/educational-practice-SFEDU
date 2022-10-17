import View from "./view.js";
import { Car } from "../abstracts/car";
import { IView } from "../abstracts/common";

const template = 'car';

export default class CarView extends View implements IView {
    car: Car | null = null;

    constructor() {
        super(template);
    }

    public getCar(): Car | null {
        return this.car;
    }

    public setCar(car: Car): this {
        this.car = car;

        return this;
    }
}