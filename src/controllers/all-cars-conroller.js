import CarsView from '../views/cars-view.js';
import Database from '../database.js';
import bodyParser from 'body-parser';

export default class CarsController {
    async execute(req, res, next) {
        const connection = Database.getConnection();
        const carsView = new CarsView();

        if (req.method === 'GET') {
            const carsDb = await connection.awaitQuery(`select * from car`);

            carsView.setCars(carsDb);
            const cars = carsView.getCars();

            res.render(carsView.getTemplate(), { cars });
        } else {
            await connection.awaitQuery(
                `INSERT INTO car (mileage, number, brand_id, model, country_id, client_id, year_manifacture) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [req.body.mileage, req.body.number, req.body.brand, req.body.model, req.body.country, req.body.client, req.body.year]);
            res.redirect('/cars');
        }
    }
}