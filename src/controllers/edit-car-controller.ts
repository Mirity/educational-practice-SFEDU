import CarView from '../views/car-view.js';
import AbstractWebController from "./abstract-web-controller.js";
import CarConverter from "../converters/car-converter.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";
import CarProvider from "../models/provider/car-provider.js";


export default class EditCarController extends AbstractWebController implements IController {
    private carView: CarView;

    constructor() {
        super();

        this.carView = new CarView();
    }

    public async getHandler (res: Response, req: Request): Promise<void> {
        const id = req.query.id;
        const carProvider = new CarProvider()

        if (!this.isCorrectId(id)) {
            return this.handleInvalidId(res);
        }

        try {
            const car = await carProvider.getCarById(id);

            this.carView
                .setCar(CarConverter.convertCarToEntity(car))
                .setTemplate('edit-car');

            this.carView.setCsrfToken(req.session.csrfToken);

            this.render(res, this.carView, req.session.isLoggedIn)
        } catch (err: any) {
            this.redirectToError(res, err.message, 404)
        }
    }

    public async postHandler (res: Response, req: Request): Promise<void> {
        let params = req.body;

        const carProvider = new CarProvider();

        try {
            await carProvider.putCar(params, params.id);

            res.redirect('/cars');

        } catch (err: any) {
            this.redirectToError(res, err.message, 400);
        }
    }
}