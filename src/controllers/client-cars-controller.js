import CarsView from "../views/cars-view.js";
import CarResource from "../models/resource/car-resource.js";
import AbstractController from "./abstract-controller.js";


export default class ClientCarsController extends AbstractController {
    async getHandler (res, req) {
        if(!req.session.isLoggedIn) {
            this.redirectToError(res, 'Войдите, чтобы продолжить');

            return;
        }

        const carResource = new CarResource();
        const cars = await carResource.getCarsByClientId(req.session.userId);

        const carsView = new CarsView();
        carsView
            .setCars(cars)
            .setTemplate('client-cars');

        this.render(res, carsView, req.session.isLoggedIn);
    }
}