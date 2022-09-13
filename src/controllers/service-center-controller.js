import ServiceCenterView from '../views/service-center-view.js';
import Database from "../database.js";
import ServiceCentersView from "../views/service-centers-view.js";

export default class ServiceCenterController {
    async execute(req, res, next) {

        if (req.method === 'GET') {
            await this.#getHandler(res, req);
        } else {
            await this.#postHandler(res, req);
        }
    }

    async #getHandler (res, req) {
        const serviceCenter = await Database.makeQuery(`SELECT service_center.id, service_center.name, street, house, number_seats, country.name AS country_name, city.name AS city_name FROM service_center JOIN country ON country.id = service_center.country_id JOIN city ON city.id = service_center.city_id where service_center.id = '${req.query.id}'`);

        const serviceCenterView = new ServiceCenterView();
        serviceCenterView.setServiceCenter(serviceCenter)

        res.render(serviceCenterView.getTemplate(), { 'this': serviceCenterView });
    }

    async #postHandler (res, req) {
        const {name, country, city, street, house, number_seats} = req.body;

        await Database.makeQuery(
            `INSERT INTO service_center (name, country_id, city_id, street, house, number_seats) VALUES (?, (select id from country where name='${country}'), (select id from city where name='${city}'), ?, ?, ?)`,
            [name, street, house, number_seats]);
        res.redirect('/service-centers');
    }
}