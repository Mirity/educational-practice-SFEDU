import CarView from '../views/car-view.js';
import CarResource from "../models/resource/car-resource.js";
import AbstractController from "./abstract-controller.js";


export default class EditCarController extends AbstractController {
    async getHandler (res, req) {
        const carResource = new CarResource();
        const id = req.query.id;

        if (!this.isCorrectId(id)) {
            return this.handleInvalidId(res);
        }

        const car = await carResource.getCarById(id);

        const carView = new CarView();
        carView
            .setCar(car)
            .setTemplate('edit-car')
            .setCsrfToken(req.session.csrfToken);

        this.render(res, carView, req.session.isLoggedIn)
    }

    async postHandler (res, req) {
        let params = req.body;

        const carResource = new CarResource();
        await carResource.editCarById(params);

        res.redirect('/cars');
    }
}