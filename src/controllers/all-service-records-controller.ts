import ServiceRecordsView from '../views/service-records-view.js';
import ServiceRecordResource from "../models/resource/service-record-resource.js";
import AbstractController from "./abstract-controller.js";
import ServiceRecordConverter from "../converters/service-record-converter.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";


export default class ServiceRecordsController extends AbstractController implements IController  {
    public async getHandler (res: Response, req: Request): Promise<void> {
        const serviceRecordResource = new ServiceRecordResource();
        const serviceRecordsDb = await serviceRecordResource.getServiceRecords();

        const serviceRecordsView = new ServiceRecordsView();
        serviceRecordsView
            .setServiceRecords(ServiceRecordConverter.convertDbServiceRecords(serviceRecordsDb))
            .setCsrfToken(req.session.csrfToken);

        this.render(res, serviceRecordsView, req.session.isLoggedIn)
    }
}