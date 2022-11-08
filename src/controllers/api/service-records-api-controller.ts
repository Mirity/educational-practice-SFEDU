import AbstractApiController from "./abstract-api-controller.js";
import { IController } from "../../abstracts/common";
import { Request, Response } from "express";
import ServiceRecordProvider from "../../models/provider/service-record-provider.js";
import { ServiceRecord } from "../../abstracts/service-record";

export default class ServiceRecordsApiController extends AbstractApiController implements IController {
    private serviceRecordProvider: ServiceRecordProvider;

    constructor() {
        super();

        this.serviceRecordProvider = new ServiceRecordProvider();
    }

    public async getHandler(res: Response, req: Request): Promise<void> {
        let serviceRecords: ServiceRecord[];

        try {
            serviceRecords = await this.serviceRecordProvider.getServiceRecords();

            this.sendData<ServiceRecord[]>(res, serviceRecords);
        } catch(err: any) {
            this.sendErrorMessageJson(res, err.message);
        }
    }
}