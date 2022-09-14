import CarView from '../views/car-view.js';
import CarResource from "../models/resource/car-resource.js";


export default class EditCarController {
    async execute(req, res, next) {
        if (req.method === 'GET') {
            await this.#getHandler(res, req);
        } else if (req.method === 'POST'){
            await this.#putHandler(res, req);
        }
    }

    async #getHandler (res, req) {
        const carResource = new CarResource();
        const id = req.query.id;

        if (!id || Number.isInteger(id) || id <= 0) {
            res.status(500)
                .send(`No id provided or id incorrect`);

            return;
        }

        const car = await carResource.getCarById(id);

        const carView = new CarView();
        carView.setCar(car);
        carView.setTemplate('edit-car');

        res.render(carView.getTemplate(), { 'this': carView });
    }

    async #putHandler (res, req) {
        const carResource = new CarResource();
        await carResource.editCarById(req);

        res.redirect(`/cars`);
    }
}