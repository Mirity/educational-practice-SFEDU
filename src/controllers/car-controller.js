import CarView from '../views/car-view.js';
import Database from '../database.js';

export default class CarController {
    async execute(req, res, next) {
        const connection = Database.getConnection();

        const car = await connection.awaitQuery(`select * from car where id=1`);

        const carView = new CarView();
        carView.setCar(car);

        res.render(carView.getTemplate(), { 'this': carView });
    }
}