import ServiceRecordView from '../views/service-record-view.js';
import ServiceRecordResource from "../models/resource/service-record-resource.js";
import AbstractController from "./abstract-controller.js";

export default class ServiceRecordController extends AbstractController {
    async execute(req, res, next) {
        await super.execute(req, res, next);
    }

    async getHandler (res, req) {
        const serviceRecordResource = new ServiceRecordResource();
        const id = req.query.id;
        super.isCorrectId(id, res);

        const serviceRecord = serviceRecordResource.getServiceRecordById(id);

        const serviceRecordView = new ServiceRecordView();
        serviceRecordView.setServiceRecord(serviceRecord);

        res.render(serviceRecordView.getTemplate(), { 'this': serviceRecordView });
    }

    async postHandler (res, req) {
        const queryParams = req.body;

        const serviceRecordResource = new ServiceRecordResource();
        await serviceRecordResource.addNewServiceRecord(queryParams);

        res.redirect('/service-records')
    }
}