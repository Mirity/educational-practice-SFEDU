import CarsView from '../views/cars-view.js';
import Database from '../database.js';

export default class OldCarsController {
    async execute(req, res, next) {
        const connection = Database.getConnection();

        const cars = await connection.awaitQuery(`select * from car where year_manifacture < 2010`);

        const carsView = new CarsView();
        carsView.setCars(cars);
        carsView.setTemplate('old-cars')

        res.render(carsView.getTemplate(), { 'this': carsView });
    }
}