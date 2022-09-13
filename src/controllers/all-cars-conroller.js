import CarsView from '../views/cars-view.js';
import Database from '../database.js';

export default class CarsController {
    async execute(req, res, next) {
        if (req.method === 'GET') {
            await this.#getHandler(res);
        }
    }

    async #getHandler (res) {
        const carsView = new CarsView();
        const carsDb = await Database.makeQuery(`select car.id, mileage, number, brand.name as brand_name, model, country.name as country_name, client.name as client_name, client.surname as client_surname, year_manifacture FROM car JOIN client ON client.id = client_id JOIN country ON country.id = country_id JOIN brand ON brand.id = brand_id GROUP BY id;
`);

        carsView.setCars(carsDb);
        const cars = carsView.getCars();

        res.render(carsView.getTemplate(), { cars });
    }
}