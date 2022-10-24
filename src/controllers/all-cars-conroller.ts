import CarsView from '../views/cars-view.js';
import CarResource from "../models/resource/car-resource.js";
import AbstractWebController from "./abstract-web-controller.js";
import CarConverter from "../converters/car-converter.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";



export default class CarsController extends AbstractWebController implements IController {
    public async getHandler(res: Response, req: Request): Promise<void> {
        const carsView = new CarsView();
        const carResource = new CarResource();

        const carsDb = await carResource.getCars();

        carsView
            .setCars(CarConverter.convertDbCars(carsDb))
            .setCsrfToken(req.session.csrfToken);

        this.render(res, carsView, req.session.isLoggedIn)
    }
}