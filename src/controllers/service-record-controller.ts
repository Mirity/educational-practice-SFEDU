import ServiceRecordView from '../views/service-record-view.js';
import ServiceRecordResource from "../models/resource/service-record-resource.js";
import AbstractController from "./abstract-controller.js";
import ServiceRecordConverter from "../converters/service-record-converter.js";
import { IController } from "../abstracts/common";

export default class ServiceRecordController extends AbstractController implements IController {
    public async getHandler (res: any, req: any): Promise<void> {
        const serviceRecordResource = new ServiceRecordResource();
        const id = req.query.id;

        if (!this.isCorrectId(id)) {
            return this.handleInvalidId(res);
        }

        const serviceRecordDb = await serviceRecordResource.getServiceRecordById(id);

        if(!this.isCorrectData(serviceRecordDb)) {
            res.redirect('/404')

            return;
        }

        const serviceRecordView = new ServiceRecordView();
        serviceRecordView.setServiceRecord(ServiceRecordConverter.convertDbServiceRecord(serviceRecordDb));

        this.render(res, serviceRecordView, req.session.isLoggedIn)
    }

    public async postHandler (res: any, req: any): Promise<void> {
        let params = req.body;


        const serviceRecordResource = new ServiceRecordResource();
        await serviceRecordResource.addNewServiceRecord(params);

        res.redirect('/service-records')
    }
}