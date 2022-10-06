import CarsView from '../views/cars-view.js';
import CarResource from "../models/resource/car-resource.js";
import AbstractController from "./abstract-controller.js";
import MasterResource from "../models/resource/master-resource.js";
import MastersView from "../views/masters-view.js";

export default class CarsController extends AbstractController {
    async getHandler (res, req) {
        const carsView = new CarsView();
        const carResource = new CarResource();

        const carsDb = await carResource.getCars();

        carsView
            .setCars(carsDb)
            .setCsrfToken(req.session.csrfToken);

        this.render(res, carsView, req.session.isLoggedIn)


    }

}