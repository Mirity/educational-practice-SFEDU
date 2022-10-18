import ServiceRecordsView from "../views/service-records-view.js";
import ServiceRecordResource from "../models/resource/service-record-resource.js";
import AbstractController from "./abstract-controller.js";
import ServiceRecordConverter from "../converters/service-record-converter.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";


export default class ClientRecordsController extends AbstractController implements IController {
    public async getHandler (res: Response, req: Request): Promise<void> {
        if(!req.session.isLoggedIn) {
            this.redirectToError(res, 'Войдите, чтобы продолжить');

            return;
        }

        const serviceRecordResource = new ServiceRecordResource();

        const userId = req.session.userId;

        if(!this.isCorrectId(userId)) {
            this.redirectToError(res, 'Войдите, чтобы продолжить');

            return;
        }

        const recordsDb = await serviceRecordResource.getServiceRecordsByClientId(userId);

        const serviceRecordsView = new ServiceRecordsView();
        serviceRecordsView
            .setServiceRecords(ServiceRecordConverter.convertDbServiceRecords(recordsDb))
            .setTemplate('client-records');


        this.render(res, serviceRecordsView, req.session.isLoggedIn)
    }
}