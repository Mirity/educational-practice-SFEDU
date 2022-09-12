import ServiceRecordsView from '../views/service-records-view.js';
import Database from "../database.js";

export default class ServiceRecordsController {
    async execute(req, res, next) {
        const connection = Database.getConnection();

        if (req.method === 'GET') {
            const serviceRecords = await connection.awaitQuery(`SELECT service_record.id, service_record.date, car.number, client.passport, client.name as client_name, client.surname as client_surname FROM service_record JOIN car ON car.id = service_record.car_id JOIN client on client.id = service_record.client_id GROUP BY service_record.id`);
            const serviceRecordsView = new ServiceRecordsView();
            serviceRecordsView.setServiceRecords(serviceRecords);

            res.render(serviceRecordsView.getTemplate(), { 'this': serviceRecordsView });
        } else {
            console.log(req.body.date)
            await connection.awaitQuery(
                `INSERT INTO service_record (car_id, client_id, date) VALUES ((select id from car where number='${req.body.car}'), (select id from client where passport='${req.body.client}'), '${req.body.date}')`,
                []);
            res.redirect('/service_records')
        }
    }
}