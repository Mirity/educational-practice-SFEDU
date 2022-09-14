import ServiceRecordsView from '../views/service-records-view.js';
import ServiceRecordResource from "../models/resource/service-record-resource.js";

export default class ServiceRecordsController {
    async execute(req, res, next) {
        if (req.method === 'GET') {
            await this.#getHandler(res);
        }
    }

    async #getHandler (res) {
        const serviceRecordResource = new ServiceRecordResource();
        const serviceRecords = serviceRecordResource.getServiceRecords();

        const serviceRecordsView = new ServiceRecordsView();
        serviceRecordsView.setServiceRecords(serviceRecords);

        res.render(serviceRecordsView.getTemplate(), { 'this': serviceRecordsView });
    }
}