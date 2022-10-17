import View from "./view.js";
import { Car } from "../abstracts/car";
import { IView } from "../abstracts/common";

const template = 'cars';

export default class CarsView extends View implements IView {
    cars: Car[] | null = null;

    constructor() {
        super(template);
    }

    public setCars(cars: Car[]): this {
        this.cars = cars;

        return this;
    }

    public getCars(): Car[] | null {
        return this.cars;
    }
}
