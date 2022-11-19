import CarView from '../views/car-view.js';
import AbstractWebController from "./abstract-web-controller.js";
import CarConverter from "../converters/car-converter.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";
import CarProvider from "../models/provider/car-provider.js";


export default class CarController extends AbstractWebController implements IController {
    private carView: CarView;
    private carProvider: CarProvider;

    constructor() {
        super();

        this.carProvider = new CarProvider();
        this.carView = new CarView();
    }

    public async getHandler (res: Response, req: Request): Promise<void> {
        const id = req.query.id;

        if (!this.isCorrectId(id)) {
            return this.handleInvalidId(res);
        }


        try {
            const car = await this.carProvider.getCarById(id);
            this.carView.setCar(CarConverter.convertCarToEntity(car))


            this.render(res, this.carView, req.session.isLoggedIn)
        } catch (err: any) {
            this.redirectToError(res, err.message, 404);
        }
    }

    public async postHandler (res: Response, req: Request): Promise<void> {
        let params = req.body;

        try {
            await this.carProvider.postCar(params);

            res.redirect('/my-cars');

        } catch (err: any) {
            this.redirectToError(res, err.message, 400);
        }
    }
}