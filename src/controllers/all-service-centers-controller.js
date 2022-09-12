import ServiceCentersView from '../views/service-centers-view.js';
import Database from "../database.js";

export default class ServiceCentersController {
    async execute(req, res, next) {
        const connection = Database.getConnection();

        if (req.method === 'GET') {
            const serviceCenters = await connection.awaitQuery(`SELECT service_center.id, service_center.name, street, house, number_seats, country.name AS country_name, city.name AS city_name FROM service_center JOIN country ON country.id = service_center.country_id JOIN city ON city.id = service_center.city_id;
`);

            const serviceCentersView = new ServiceCentersView();
            serviceCentersView.setServiceCenters(serviceCenters)

            res.render(serviceCentersView.getTemplate(), { 'this': serviceCentersView });
        } else {
            await connection.awaitQuery(
                `INSERT INTO service_center (name, country_id, city_id, street, house, number_seats) VALUES (?, (select id from country where name='${req.body.country}'), (select id from city where name='${req.body.city}'), ?, ?, ?)`,
                [req.body.name, req.body.street, req.body.house, req.body.number_seats]);
            res.redirect('/service_centers');
        }

    }
}