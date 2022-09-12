import CarsView from '../views/cars-view.js';
import Database from '../database.js';

export default class OldCarsController {
    async execute(req, res, next) {
        const connection = Database.getConnection();

        const cars = await connection.awaitQuery(`select car.id, mileage, number, brand.name as brand_name, model, country.name as country_name, client.name as client_name, client.surname as client_surname, year_manifacture FROM car JOIN client ON client.id = client_id JOIN country ON country.id = country_id JOIN brand ON brand.id = brand_id where year_manifacture < 2010`);

        const carsView = new CarsView();
        carsView.setCars(cars);
        carsView.setTemplate('old-cars')

        res.render(carsView.getTemplate(), { 'this': carsView });
    }
}