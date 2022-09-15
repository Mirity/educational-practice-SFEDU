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

        const serviceRecord = serviceRecordResource.getServiceRecordById(id);

        const serviceRecordView = new ServiceRecordView();
        serviceRecordView.setServiceRecord(serviceRecord);

        res.render(serviceRecordView.getTemplate(), { 'this': serviceRecordView });
    }

    async postHandler (res, req) {
        const params = req.body;

        const serviceRecordResource = new ServiceRecordResource();
        await serviceRecordResource.addNewServiceRecord(params);

        res.redirect('/service-records')
    }
}