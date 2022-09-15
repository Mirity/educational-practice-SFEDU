import CarsView from '../views/cars-view.js';
import CarResource from "../models/resource/car-resource.js";
import AbstractController from "./abstract-controller.js";

export default class CarsController extends AbstractController {
    async getHandler (res) {
        const carsView = new CarsView();
        const carResource = new CarResource();

        const carsDb = carResource.getCars();

        carsView.setCars(carsDb);
        const cars = carsView.getCars();

        res.render(carsView.getTemplate(), { cars });
    }
}