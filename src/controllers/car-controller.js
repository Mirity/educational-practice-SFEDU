import CarView from '../views/car-view.js';
import CarResource from "../models/resource/car-resource.js";
import AbstractController from "./abstract-controller.js";


export default class CarController extends AbstractController {
    async execute(req, res, next) {
        await super.execute(req, res, next);
    }

    async getHandler (res, req) {
        const carResource = new CarResource();
        const id = req.query.id;
        super.isCorrectId(id, res);

        const car = await carResource.getCarById(req.query.id);

        const carView = new CarView();
        carView.setCar(car);

        res.render(carView.getTemplate(), { 'this': carView });
    }

    async postHandler (res, req) {
        const queryParams = req.body;

        const carResource = new CarResource();
        await carResource.addNewCar(queryParams);

        res.redirect('/cars');
    }
}