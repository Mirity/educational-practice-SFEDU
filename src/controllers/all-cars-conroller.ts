import CarsView from '../views/cars-view.js';
import CarResource from "../models/resource/car-resource.js";
import AbstractController from "./abstract-controller.js";
import CarConverter from "../converters/car-converter.js";
import { IController } from "../abstracts/common";


export default class CarsController extends AbstractController implements IController {
    public  async getHandler (res: any, req: any): Promise<void> {
        const carsView = new CarsView();
        const carResource = new CarResource();

        const carsDb = await carResource.getCars();

        carsView
            .setCars(CarConverter.convertDbCars(carsDb))
            .setCsrfToken(req.session.csrfToken);

        this.render(res, carsView, req.session.isLoggedIn)
    }
}