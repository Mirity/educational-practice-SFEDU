import AbstractApiController from "./abstract-api-controller.js";
import { IController } from "../../abstracts/common";
import { Request, Response } from "express";
import { ServiceRecord } from "../../abstracts/service-record";
import ServiceRecordProvider from "../../models/provider/service-record-provider.js";

export default class ServiceRecordApiController extends AbstractApiController implements IController {
    private serviceRecordProvider: ServiceRecordProvider;

    constructor() {
        super();

        this.serviceRecordProvider = new ServiceRecordProvider();
    }

    public async getHandler(res: Response, req: Request): Promise<void> {
        const id = req.params.id;

        if (!this.isCorrectId(id)) {
            this.sendErrorMessageJson(res, 'Invalid id');

            return;
        }

        try {
            const serviceRecord = await this.serviceRecordProvider.getServiceRecordById(id);

            this.sendData<ServiceRecord>(res, serviceRecord);
        } catch(err: any) {
            this.sendErrorMessageJson(res, err.message, 404);
        }
    }

    public async postHandler(res: Response, req: Request): Promise<void> {
        let params = req.body;

        try {
            await this.serviceRecordProvider.postServiceRecord(params);

            this.sendMessageJson(res, 'Ok');
        } catch (err: any) {
            this.sendErrorMessageJson(res, err.message, 400);
        }
    }

    public async putHandler(res: Response, req: Request) {
        const id = req.params.id;
        const params = {...req.body, id}

        if (!this.isCorrectId(id)) {
            this.sendErrorMessageJson(res, 'Invalid id');

            return;
        }

        try {
            await this.serviceRecordProvider.putServiceRecord(params);

            this.sendMessageJson(res, 'Ok');
        } catch (err: any) {
            this.sendErrorMessageJson(res, err.message, 400);
        }
    }

    public async deleteHandler(res: Response, req: Request) {
        const id = req.params.id;

        if (!this.isCorrectId(id)) {
            this.sendErrorMessageJson(res, 'Invalid id');

            return;
        }

        try {
            await this.serviceRecordProvider.deleteServiceRecord(id);

            this.sendMessageJson(res, 'Ok');
        } catch (err: any) {
            this.sendErrorMessageJson(res, err.message, 400);
        }
    }
}