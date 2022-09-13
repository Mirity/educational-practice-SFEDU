import CarView from '../views/car-view.js';
import Database from '../database.js';


export default class CarController {
    async execute(req, res, next) {
        if (req.method === 'GET') {
            await this.#getHandler(res, req);
        } else {
            await this.#postHandler(res, req);
        }
    }

    async #getHandler (res, req) {
        const car = await Database.makeQuery(`select car.id, mileage, number, brand.name as brand_name, model, country.name as country_name, client.name as client_name, client.surname as client_surname, year_manifacture FROM car JOIN client ON client.id = client_id JOIN country ON country.id = country_id JOIN brand ON brand.id = brand_id  WHERE car.id='${req.query.id}'`);

        const carView = new CarView();
        carView.setCar(car);

        res.render(carView.getTemplate(), { 'this': carView });
    }

    async #postHandler (res, req) {
        const {mileage, number, brand, country, client_name, client_surname, model, year} = req.body;

        await Database.makeQuery(
            `INSERT INTO car (mileage, number, brand_id, model, country_id, client_id, year_manifacture) VALUES (?, ?, (select id from brand where name = '${brand}'), ?, (select id from country where name = '${country}'), (select id from client where name = '${client_name}' and surname = '${client_surname}'), ?)`,
            [mileage, number, model, year]);

        res.redirect('/cars');
    }
}