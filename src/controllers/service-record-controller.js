import ServiceRecordView from '../views/service-record-view.js';
import ServiceRecordResource from "../models/resource/service-record-resource.js";

export default class ServiceRecordController {
    async execute(req, res, next) {

        if (req.method === 'GET') {
            await this.#getHandler(res, req);
        } else {
            await this.#postHandler(res, req);
        }
    }

    async #getHandler (res, req) {
        const serviceRecordResource = new ServiceRecordResource();
        const id = req.query.id;

        if (!id || Number.isInteger(id) || id <= 0) {
            res.status(500)
                .send(`No id provided or id incorrect`);

            return;
        }

        const serviceRecord = serviceRecordResource.getServiceRecordById(id);

        const serviceRecordView = new ServiceRecordView();
        serviceRecordView.setServiceRecord(serviceRecord);

        res.render(serviceRecordView.getTemplate(), { 'this': serviceRecordView });
    }

    async #postHandler (res, req) {
        const serviceRecordResource = new ServiceRecordResource();
        await serviceRecordResource.postServiceRecord(req);

        res.redirect('/service-records')
    }
}