import ServiceRecordsView from '../views/service-records-view.js';
import AbstractWebController from "./abstract-web-controller.js";
import ServiceRecordConverter from "../converters/service-record-converter.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";
import { ServiceRecord } from "../abstracts/service-record";
import ServiceRecordProvider from "../models/provider/service-record-provider.js";


export default class ServiceRecordsController extends AbstractWebController implements IController  {
    private serviceRecordsView: ServiceRecordsView;

    constructor() {
        super();

        this.serviceRecordsView = new ServiceRecordsView();
    }

    public async getHandler (res: Response, req: Request): Promise<void> {
        const serviceRecordProvider = new ServiceRecordProvider();
        let serviceRecords: ServiceRecord[];

        try {
            serviceRecords = await serviceRecordProvider.getServiceRecords();

            this.serviceRecordsView
                .setServiceRecords(ServiceRecordConverter.convertServiceRecordsToEntities(serviceRecords))
                .setCsrfToken(req.session.csrfToken);

            this.render(res, this.serviceRecordsView, req.session.isLoggedIn)
        } catch (err: any) {
            this.redirectToError(res, err.message)
        }
    }
}