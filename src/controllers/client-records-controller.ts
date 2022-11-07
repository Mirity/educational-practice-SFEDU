import ServiceRecordsView from "../views/service-records-view.js";
import AbstractWebController from "./abstract-web-controller.js";
import ServiceRecordConverter from "../converters/service-record-converter.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";
import ServiceRecordProvider from "../models/provider/service-record-provider.js";
import ClientProvider from "../models/provider/client-provider.js";


export default class ClientRecordsController extends AbstractWebController implements IController {
    private clientProvider: ClientProvider;
    private serviceRecordsView: ServiceRecordsView;

    constructor() {
        super();

        this.clientProvider = new ClientProvider();
        this.serviceRecordsView = new ServiceRecordsView();
    }

    public async getHandler (res: Response, req: Request): Promise<void> {
        const userId = req.session.userId;

        if (!this.clientProvider.isLoggedInHandler(req.session.isLoggedIn, userId)) {
           this.redirectToError(res,'Войдите, чтобы продолжить');

           return;
        }

        const serviceRecordsProvider = new ServiceRecordProvider();

        try {
            const serviceRecords = await serviceRecordsProvider.getRecordsByClientId(userId);

            this.serviceRecordsView
                .setServiceRecords(ServiceRecordConverter.convertServiceRecordsToEntities(serviceRecords))
                .setTemplate('client-records');

            this.render(res, this.serviceRecordsView, req.session.isLoggedIn);
        } catch (err: any) {
            this.redirectToError(res, err.message)
        }
    }
}