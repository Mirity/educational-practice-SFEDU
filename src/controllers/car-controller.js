import CarView from '../views/car-view.js';
import CarResource from "../models/resource/car-resource.js";
import AbstractController from "./abstract-controller.js";


export default class CarController extends AbstractController {
    async getHandler (res, req) {
        const carResource = new CarResource();
        const id = req.query.id;

        if (!this.isCorrectId(id)) {
            return this.handleInvalidId(res);
        }

        const car = await carResource.getCarById(req.query.id);

        const carView = new CarView();
        carView.setCar(car);

        res.render(carView.getTemplate(), { 'this': carView });
    }

    async postHandler (res, req) {
        const params = req.body;

        const carResource = new CarResource();
        await carResource.addNewCar(params);

        res.redirect('/cars');
    }
}