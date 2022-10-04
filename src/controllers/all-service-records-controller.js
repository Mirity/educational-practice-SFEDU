import ServiceRecordsView from '../views/service-records-view.js';
import ServiceRecordResource from "../models/resource/service-record-resource.js";
import AbstractController from "./abstract-controller.js";

export default class ServiceRecordsController extends AbstractController {
    async getHandler (res, req) {
        const serviceRecordResource = new ServiceRecordResource();
        const serviceRecords = await serviceRecordResource.getServiceRecords();

        const serviceRecordsView = new ServiceRecordsView();
        serviceRecordsView.setServiceRecords(serviceRecords);

        this.render(res, serviceRecordsView, req.session.isLoggedIn)
    }
}