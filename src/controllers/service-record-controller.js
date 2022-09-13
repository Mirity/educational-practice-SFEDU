import ServiceRecordView from '../views/service-record-view.js';
import Database from "../database.js";
import ServiceRecordsView from "../views/service-records-view.js";

export default class ServiceRecordController {
    async execute(req, res, next) {

        if (req.method === 'GET') {
            await this.#getHandler(res, req);
        } else {
            await this.#postHandler(res, req);
        }
    }

    async #getHandler (res, req) {
        const serviceRecords = await Database.makeQuery(`SELECT service_record.id, service_record.date, car.number, client.passport, client.name as client_name, client.surname as client_surname FROM service_record JOIN car ON car.id = service_record.car_id JOIN client on client.id = service_record.client_id WHERE service_record.id = '${req.query.id}' GROUP BY service_record.id`);

        const serviceRecordView = new ServiceRecordView();
        serviceRecordView.setServiceRecord(serviceRecords[0]);

        res.render(serviceRecordView.getTemplate(), { 'this': serviceRecordView });
    }

    async #postHandler (res, req) {
        const {car, client, date} = req.body;
        await Database.makeQuery(
            `INSERT INTO service_record (car_id, client_id, date) VALUES ((select id from car where number='${car}'), (select id from client where passport='${client}'), ?)`,
            [date]);
        res.redirect('/service-records')
    }
}