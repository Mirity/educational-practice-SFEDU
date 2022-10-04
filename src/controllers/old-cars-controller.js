import CarsView from '../views/cars-view.js';
import CarResource from "../models/resource/car-resource.js";
import AbstractController from "./abstract-controller.js";

export default class OldCarsController extends AbstractController {
    async getHandler(res, req) {
        const carResource = new CarResource();
        const cars = await carResource.getOldCars();

        const carsView = new CarsView();
        carsView
            .setCars(cars)
            .setTemplate('old-cars')

        this.render(res, carsView, req.session.isLoggedIn)
    }
}