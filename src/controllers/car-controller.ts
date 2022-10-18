import CarView from '../views/car-view.js';
import CarResource from "../models/resource/car-resource.js";
import AbstractController from "./abstract-controller.js";
import CarConverter from "../converters/car-converter.js";
import { IController } from "../abstracts/common";
import {DbCar} from "../abstracts/car";


export default class CarController extends AbstractController implements IController {
    public async getHandler (res: any, req: any): Promise<void> {
        const carResource = new CarResource();
        const id = req.query.id;

        if (!this.isCorrectId(id)) {
            return this.handleInvalidId(res);
        }

        const carDb = await carResource.getCarById(req.query.id);

        if(!this.isCorrectData(carDb)) {
            res.redirect('/404')

            return;
        }

        const carView = new CarView();
        carView.setCar(CarConverter.convertDbCar(carDb))


        this.render(res, carView, req.session.isLoggedIn)
    }

    public async postHandler (res: any, req: any): Promise<void> {
        let params = req.body;

        const carResource = new CarResource();
        await carResource.addNewCar(params);

        res.redirect('/cars');
    }
}