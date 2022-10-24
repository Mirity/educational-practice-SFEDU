import AbstractApiController from "./abstract-api-controller.js";
import { IController } from "../../abstracts/common";
import { Request, Response } from "express";
import ServiceRecordResource from "../../models/resource/service-record-resource.js";
import ServiceRecordConverter from "../../converters/service-record-converter.js";
import ServiceRecordEntity from "../../models/entity/service-record-entity";

export default class ServiceRecordsApiController extends AbstractApiController implements IController {
    public async getHandler(res: Response, req: Request): Promise<void> {
        const serviceRecordResource = new ServiceRecordResource();

        const serviceRecordsDb = await serviceRecordResource.getServiceRecords();

        if(!this.isCorrectData(serviceRecordsDb)) {
            this.sendErrorMessageJson(res, 'No serviceRecordsDb', 200);

            return;
        }

        const serviceRecords = ServiceRecordConverter.convertDbServiceRecords(serviceRecordsDb);

        this.sendData<ServiceRecordEntity[]>(res, serviceRecords);
    }
}