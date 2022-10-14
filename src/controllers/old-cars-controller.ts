import CarsView from '../views/cars-view.js';
import CarResource from "../models/resource/car-resource.js";
import AbstractController from "./abstract-controller.js";
import CarConverter from "../converters/car-converter.js";
import { IController } from "../abstracts/common";

export default class OldCarsController extends AbstractController implements IController{
    public async getHandler(res: any, req: any): Promise<void> {
        const carResource = new CarResource();
        const carsDb = await carResource.getOldCars();

        const carsView = new CarsView();
        carsView
            .setCars(CarConverter.convertDbCars(carsDb))
            .setTemplate('old-cars')

        this.render(res, carsView, req.session.isLoggedIn)
    }
}