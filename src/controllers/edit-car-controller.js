import CarView from '../views/car-view.js';
import CarResource from "../models/resource/car-resource.js";
import AbstractController from "./abstract-controller.js";


export default class EditCarController extends AbstractController {
    async getHandler (res, req) {
        const carResource = new CarResource();
        const id = req.query.id;

        if(!this.idHandler(id, res)) {
            return;
        }

        const car = await carResource.getCarById(id);

        const carView = new CarView();
        carView
            .setCar(car)
            .setTemplate('edit-car');

        res.render(carView.getTemplate(), { 'this': carView });
    }

    async postHandler (res, req) {
        const params = req.body;

        const carResource = new CarResource();
        await carResource.editCarById(params);

        res.redirect('/cars');
    }
}