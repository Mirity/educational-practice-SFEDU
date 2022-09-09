import ServiceRecordView from '../views/service-record-view.js';
import Database from "../database.js";

export default class ServiceRecordController {
    async execute(req, res, next) {
        const connection = Database.getConnection();

        const serviceRecord = await connection.awaitQuery(`select * from service_record where id = 1`);

        const serviceRecordView = new ServiceRecordView();
        serviceRecordView.setServiceRecord(serviceRecord);

        res.render(serviceRecordView.getTemplate(), { 'this': serviceRecordView });
    }
}