import CarsView from "../views/cars-view.js";
import CarResource from "../models/resource/car-resource.js";
import AbstractController from "./abstract-controller.js";
import CarConverter from "../converters/car-converter.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";


export default class ClientCarsController extends AbstractController implements IController {
    public async getHandler (res: Response, req: Request): Promise<void> {
        if(!req.session.isLoggedIn) {
            this.redirectToError(res, 'Войдите, чтобы продолжить');

            return;
        }

        const carResource = new CarResource();
        const userId = req.session.userId;

        if(!this.isCorrectId(userId)) {
            this.redirectToError(res, 'Войдите, чтобы продолжить');

            return;
        }

        const carsDb = await carResource.getCarsByClientId(userId);

        const carsView = new CarsView();
        carsView
            .setCars(CarConverter.convertDbCars(carsDb))
            .setTemplate('client-cars');

        this.render(res, carsView, req.session.isLoggedIn);
    }
}