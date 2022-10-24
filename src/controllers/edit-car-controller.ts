import CarView from '../views/car-view.js';
import CarResource from "../models/resource/car-resource.js";
import AbstractWebController from "./abstract-web-controller.js";
import CarConverter from "../converters/car-converter.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";


export default class EditCarController extends AbstractWebController implements IController {
    public async getHandler (res: Response, req: Request): Promise<void> {
        const carResource = new CarResource();
        const id = req.query.id;

        if (!this.isCorrectId(id)) {
            return this.handleInvalidId(res);
        }

        const carDb = await carResource.getCarById(id);

        if(!this.isCorrectData(carDb)) {
            res.redirect('/404')

            return;
        }

        const carView = new CarView();
        carView
            .setCar(CarConverter.convertDbCar(carDb))
            .setTemplate('edit-car');

        carView.setCsrfToken(req.session.csrfToken);

        this.render(res, carView, req.session.isLoggedIn)
    }

    public async postHandler (res: Response, req: Request): Promise<void> {
        let params = req.body;

        const carResource = new CarResource();

        try {
            await carResource.editCarById(params);
        } catch (err) {
            this.redirectToError(res, 'Неверно введены данные', 400);

            return;
        }

        res.redirect('/cars');
    }
}