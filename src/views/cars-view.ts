import View from "./view.js";
import { IView } from "../abstracts/common";
import CarEntity from "../models/entity/car-entity.js";

const template = 'cars';

export default class CarsView extends View implements IView {
    cars: CarEntity[] | null = null;

    constructor() {
        super(template);
    }

    public setCars(cars: CarEntity[]): this {
        this.cars = cars;

        return this;
    }

    public getCars(): CarEntity[] | null {
        return this.cars;
    }
}
