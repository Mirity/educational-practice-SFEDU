import View from "./view.js";
import { IView } from "../abstracts/common";
import CarEntity from "../models/entity/car-entity";

const template = 'car';

export default class CarView extends View implements IView {
    car: CarEntity | null = null;

    constructor() {
        super(template);
    }

    public getCar(): CarEntity | null {
        return this.car;
    }

    public setCar(car: CarEntity): this {
        this.car = car;

        return this;
    }
}