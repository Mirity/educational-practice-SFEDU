import ServiceRecordView from '../views/service-record-view.js';
import AbstractWebController from "./abstract-web-controller.js";
import ServiceRecordConverter from "../converters/service-record-converter.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";
import ServiceRecordProvider from "../models/provider/service-record-provider.js";


export default class ServiceRecordController extends AbstractWebController implements IController {
    private serviceRecordView: ServiceRecordView;
    private serviceRecordProvider: ServiceRecordProvider;

    constructor() {
        super();

        this.serviceRecordProvider = new ServiceRecordProvider();
        this.serviceRecordView = new ServiceRecordView();
    }

    public async getHandler (res: Response, req: Request): Promise<void> {
        const id = req.query.id;

        if (!this.isCorrectId(id)) {
            return this.handleInvalidId(res);
        }

        try {
            const serviceRecord = await this.serviceRecordProvider.getServiceRecordById(id);

            this.serviceRecordView.setServiceRecord(ServiceRecordConverter.convertServiceRecordToEntity(serviceRecord))

            this.render(res, this.serviceRecordView, req.session.isLoggedIn)
        } catch (err: any) {
            this.redirectToError(res, err.message, 404);
        }
    }

    public async postHandler (res: Response, req: Request): Promise<void> {
        let params = req.body;

        try {
            await this.serviceRecordProvider.postServiceRecord(params);

            res.redirect('/service-records');

        } catch (err: any) {
            this.redirectToError(res, err.message, 400);
        }
    }
}