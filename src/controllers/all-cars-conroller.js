import CarsView from '../views/cars-view.js';

export default class CarsController {
    execute(req, res, next) {
        const carsView = new CarsView();
        const cars = carsView.getCars();

        res.render(carsView.getTemplate(), { cars });
    }
}