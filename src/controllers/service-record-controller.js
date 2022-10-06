import ServiceRecordView from '../views/service-record-view.js';
import ServiceRecordResource from "../models/resource/service-record-resource.js";
import AbstractController from "./abstract-controller.js";

export default class ServiceRecordController extends AbstractController {
    async getHandler (res, req) {
        const serviceRecordResource = new ServiceRecordResource();
        const id = req.query.id;

        if (!this.isCorrectId(id)) {
            return this.handleInvalidId(res);
        }

        const serviceRecord = await serviceRecordResource.getServiceRecordById(id);

        const serviceRecordView = new ServiceRecordView();
        serviceRecordView.setServiceRecord(serviceRecord);

        this.render(res, serviceRecordView, req.session.isLoggedIn)
    }

    async postHandler (res, req) {
        const params = req.body;
        for(let key in params) {
            params[key] = this.escapeHtml(params[key]);
        }

        if(!(params.csrf_token === req.session.csrfToken)) {
            this.redirectToError(res, 'Отказано в доступе');

            return;
        }

        const serviceRecordResource = new ServiceRecordResource();
        await serviceRecordResource.addNewServiceRecord(params);

        res.redirect('/service-records')
    }
}