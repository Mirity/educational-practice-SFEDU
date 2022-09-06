import CarView from '../views/car-view.js';

export default class CarController {
    execute(req, res, next) {
        const carView = new CarView();

        res.render(carView.getTemplate(), { 'this': carView });
    }
}