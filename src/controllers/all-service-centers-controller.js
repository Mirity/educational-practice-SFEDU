import ServiceCentersView from '../views/service-centers-view.js';
import Database from "../database.js";

export default class ServiceCentersController {
    async execute(req, res, next) {
        const connection = Database.getConnection();

        if (req.method === 'GET') {
            const serviceCenters = await connection.awaitQuery(`select * from service_center`);

            const serviceCentersView = new ServiceCentersView();
            serviceCentersView.setServiceCenters(serviceCenters)

            res.render(serviceCentersView.getTemplate(), { 'this': serviceCentersView });
        } else {
            await connection.awaitQuery(
                `INSERT INTO service_center (name, country_id, city_id, street, house, number_seats) VALUES (?, ?, ?, ?, ?, ?)`,
                [req.body.name, req.body.country, req.body.city, req.body.street, req.body.house, req.body.number_seats]);
            res.redirect('/service_centers');
        }

    }
}