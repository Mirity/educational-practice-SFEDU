import CarsView from '../views/cars-view.js';
import CarResource from "../models/resource/car-resource.js";

export default class CarsController {
    async execute(req, res, next) {
        if (req.method === 'GET') {
            await this.#getHandler(res);
        }
    }

    async #getHandler (res) {
        const carsView = new CarsView();
        const carResource = new CarResource();

        const carsDb = carResource.getCars();

        carsView.setCars(carsDb);
        const cars = carsView.getCars();

        res.render(carsView.getTemplate(), { cars });
    }
}