import CarView from '../views/car-view.js';
import AbstractWebController from "./abstract-web-controller.js";
import CarConverter from "../converters/car-converter.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";
import CarProvider from "../models/provider/car-provider.js";
import ClientProvider from "../models/provider/client-provider.js";


export default class EditCarController extends AbstractWebController implements IController {
    private carView: CarView;
    private carProvider: CarProvider;
    private clientProvider: ClientProvider;

    constructor() {
        super();

        this.carProvider = new CarProvider()
        this.carView = new CarView();
        this.clientProvider = new ClientProvider();
    }

    public async getHandler (res: Response, req: Request): Promise<void> {
        const id = req.query.id;
        const userId = req.session.userId;

        if (!this.clientProvider.isLoggedInHandler(req.session.isLoggedIn, userId)) {
            this.redirectToError(res,'Войдите, чтобы продолжить');

            return;
        }


        if (!this.isCorrectId(id)) {
            return this.handleInvalidId(res);
        }

        try {
            const car = await this.carProvider.getCarById(id);

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

        try {
            await this.carProvider.putCar(params);

            res.redirect('/my-cars');
        } catch (err: any) {
            this.redirectToError(res, err.message, 400);
        }
    }
}