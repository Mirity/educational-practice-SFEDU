import CarsView from "../views/cars-view.js";
import CarResource from "../models/resource/car-resource.js";
import AbstractController from "./abstract-controller.js";
import url from "url";


export default class MyCarsController extends AbstractController {
    async getHandler (res, req) {
        if(!req.session.isLoggedIn) {
            res.redirect(url.format({
                pathname:"/error",
                query: {
                    "textError": "Войдите, чтобы продолжить"
                }
            }));

            return;
        }

        const carResource = new CarResource();
        const cars = await carResource.getCarsByClientId(req.session.userId);

        const carsView = new CarsView();
        carsView
            .setCars(cars)
            .setTemplate('my-cars');

        this.render(res, carsView, req.session.isLoggedIn);
    }
}