import CarView from '../views/car-view.js';
import CarResource from "../models/resource/car-resource.js";


export default class CarController {
    async execute(req, res, next) {
        if (req.method === 'GET') {
            await this.#getHandler(res, req);
        } else {
            await this.#postHandler(res, req);
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

        const car = await carResource.getCarById(req.query.id);

        const carView = new CarView();
        carView.setCar(car);

        res.render(carView.getTemplate(), { 'this': carView });
    }

    async #postHandler (res, req) {
        const carResource = new CarResource();
        await carResource.postCar(req);

        res.redirect('/cars');
    }
}