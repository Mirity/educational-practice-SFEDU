import CarsView from "../views/cars-view.js";
import AbstractWebController from "./abstract-web-controller.js";
import CarConverter from "../converters/car-converter.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";
import CarProvider from "../models/provider/car-provider.js";
import ClientProvider from "../models/provider/client-provider.js";


export default class ClientCarsController extends AbstractWebController implements IController {
    private clientProvider: ClientProvider;
    private carsView: CarsView;

    constructor() {
        super();

        this.clientProvider = new ClientProvider();
        this.carsView = new CarsView();
    }

    public async getHandler (res: Response, req: Request): Promise<void> {
        const userId = req.session.userId;

        if (!this.clientProvider.isLoggedInHandler(req.session.isLoggedIn, userId)) {
            this.redirectToError(res,'Войдите, чтобы продолжить');

            return;
        }

        const carProvider = new CarProvider();

        try {
            const cars = await carProvider.getCarsByClientId(userId);

            this.carsView
                .setCars(CarConverter.convertCarsToEntities(cars))
                .setTemplate('client-cars');

            this.render(res, this.carsView, req.session.isLoggedIn);
        } catch (err: any) {
            this.redirectToError(res, err.message)
        }

    }
}