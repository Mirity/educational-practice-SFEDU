import ServiceRecordsView from "../views/service-records-view.js";
import ServiceRecordResource from "../models/resource/service-record-resource.js";
import AbstractController from "./abstract-controller.js";


export default class ClientRecordsController extends AbstractController {
    async getHandler (res, req) {
        if(!req.session.isLoggedIn) {
            this.redirectToError(res, 'Войдите, чтобы продолжить');

            return;
        }


        const serviceRecordResource = new ServiceRecordResource();
        const records = await serviceRecordResource.getServiceRecordsByClientId(req.session.userId);

        const serviceRecordsView = new ServiceRecordsView();
        serviceRecordsView
            .setServiceRecords(records)
            .setTemplate('client-records');


        this.render(res, serviceRecordsView, req.session.isLoggedIn)
    }
}