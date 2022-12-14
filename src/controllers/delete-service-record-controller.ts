import AbstractWebController from "./abstract-web-controller.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";
import ServiceRecordProvider from "../models/provider/service-record-provider.js";

export default class DeleteServiceRecordController extends AbstractWebController implements IController {
    private serviceRecordProvider: ServiceRecordProvider;

    constructor() {
        super();

        this.serviceRecordProvider = new ServiceRecordProvider();
    }

    public async getHandler (res: Response, req: Request): Promise<void> {
        const serviceRecordId = req.query.id;

        if(!this.isCorrectId(serviceRecordId)) {
            this.redirectToError(res, 'Неверный id');

            return;
        }

        try {
            await this.serviceRecordProvider.deleteServiceRecord(serviceRecordId);
            res.redirect('/service-records');

        } catch (err: any) {
            this.redirectToError(res, err.message, 400);
        }
    }
}