import CarsView from '../views/cars-view.js';
import Database from '../database.js';
import bodyParser from 'body-parser';

export default class CarsController {
    async execute(req, res, next) {
        const connection = Database.getConnection();
        const carsView = new CarsView();

        if (req.method === 'GET') {
            const carsDb = await connection.awaitQuery(`select car.id, mileage, number, brand.name as brand_name, model, country.name as country_name, client.name as client_name, client.surname as client_surname, year_manifacture FROM car JOIN client ON client.id = client_id JOIN country ON country.id = country_id JOIN brand ON brand.id = brand_id GROUP BY id;
`);

            carsView.setCars(carsDb);
            const cars = carsView.getCars();

            res.render(carsView.getTemplate(), { cars });
        } else {
            await connection.awaitQuery(
                `INSERT INTO car (mileage, number, brand_id, model, country_id, client_id, year_manifacture) VALUES (?, ?, (select id from brand where name = '${req.body.brand}'), ?, (select id from country where name = '${req.body.country}'), (select id from client where name = '${req.body.client_name}' and surname = '${req.body.client_surname}'), ?)`,
                [req.body.mileage, req.body.number, req.body.model, req.body.year]);

            res.redirect('/cars');
        }
    }
}