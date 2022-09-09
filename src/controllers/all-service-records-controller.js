import ServiceRecordsView from '../views/service-records-view.js';
import Database from "../database.js";

export default class ServiceRecordsController {
    async execute(req, res, next) {
        const connection = Database.getConnection();

        if (req.method === 'GET') {
            const serviceRecords = await connection.awaitQuery(`select * from service_record`);

            const serviceRecordsView = new ServiceRecordsView();
            serviceRecordsView.setServiceRecords(serviceRecords);

            res.render(serviceRecordsView.getTemplate(), { 'this': serviceRecordsView });
        } else {
            await connection.awaitQuery(
                `INSERT INTO service_record (car_id, client_id, date) VALUES (?, ?, ?)`,
                [req.body.car, req.body.client, req.body.date]);
            res.redirect('/service_records');
        }
    }
}