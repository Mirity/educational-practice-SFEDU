import CarsView from '../views/cars-view.js';
import CarResource from "../models/resource/car-resource.js";

export default class OldCarsController {
    async execute(req, res, next) {
        const carResource = new CarResource();
        const cars = carResource.getOldCars();

        const carsView = new CarsView();
        carsView.setCars(cars);
        carsView.setTemplate('old-cars')

        res.render(carsView.getTemplate(), { 'this': carsView });
    }
}