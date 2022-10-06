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
        carView.setCar(car)


        this.render(res, carView, req.session.isLoggedIn)
    }

    async postHandler (res, req) {
        let params = req.body;

        if(!this.verifyCsrfToken(params.csrf_token, req.session.csrfToken)) {
            return this.redirectToError(res, 'Отказано в доступе');
        }

        params = this.handleParamsXss(params)

        const carResource = new CarResource();
        await carResource.addNewCar(params);

        res.redirect('/cars');
    }
}