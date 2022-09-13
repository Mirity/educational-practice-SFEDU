import ServiceRecordsView from '../views/service-records-view.js';
import Database from "../database.js";
import ServiceCentersView from "../views/service-centers-view.js";

export default class ServiceRecordsController {
    async execute(req, res, next) {
        if (req.method === 'GET') {
            await this.#getHandler(res);
        }
    }

    async #getHandler (res) {
        const serviceRecords = await Database.makeQuery(`SELECT service_record.id, service_record.date, car.number, client.passport, client.name as client_name, client.surname as client_surname FROM service_record JOIN car ON car.id = service_record.car_id JOIN client on client.id = service_record.client_id GROUP BY service_record.id`);
        const serviceRecordsView = new ServiceRecordsView();
        serviceRecordsView.setServiceRecords(serviceRecords);

        res.render(serviceRecordsView.getTemplate(), { 'this': serviceRecordsView });
    }
}