import ServiceRecordsView from "../views/service-records-view.js";
import ServiceRecordResource from "../models/resource/service-record-resource.js";
import AbstractController from "./abstract-controller.js";
import ServiceRecordConverter from "../converters/service-record-converter.js";
import { IController } from "../abstracts/common";


export default class ClientRecordsController extends AbstractController implements IController {
    public async getHandler (res: any, req: any): Promise<void> {
        if(!req.session.isLoggedIn) {
            this.redirectToError(res, 'Войдите, чтобы продолжить');

            return;
        }

        const serviceRecordResource = new ServiceRecordResource();
        const recordsDb = await serviceRecordResource.getServiceRecordsByClientId(req.session.userId);

        const serviceRecordsView = new ServiceRecordsView();
        serviceRecordsView
            .setServiceRecords(ServiceRecordConverter.convertDbServiceRecords(recordsDb))
            .setTemplate('client-records');


        this.render(res, serviceRecordsView, req.session.isLoggedIn)
    }
}