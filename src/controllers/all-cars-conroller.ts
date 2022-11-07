import CarsView from '../views/cars-view.js';
import AbstractWebController from "./abstract-web-controller.js";
import CarConverter from "../converters/car-converter.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";
import CarProvider from "../models/provider/car-provider.js";
import {Car} from "../abstracts/car";



export default class CarsController extends AbstractWebController implements IController {
    private carsView: CarsView;
    constructor() {
        super();

        this.carsView = new CarsView();
    }
    public async getHandler(res: Response, req: Request): Promise<void> {
        const carProvider = new CarProvider();
        let cars: Car[];

        try {
            cars = await carProvider.getCars();

            this.carsView
                .setCars(CarConverter.convertCarsToEntities(cars))
                .setCsrfToken(req.session.csrfToken);

            this.render(res, this.carsView, req.session.isLoggedIn)
        } catch (err: any) {
            this.redirectToError(res, err.message)
        }
    }
}