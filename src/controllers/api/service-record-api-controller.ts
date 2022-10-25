import AbstractApiController from "./abstract-api-controller.js";
import { IController } from "../../abstracts/common";
import {Request, Response} from "express";
import ServiceRecordResource from "../../models/resource/service-record-resource.js";
import ServiceRecordConverter from "../../converters/service-record-converter.js";
import ServiceRecordEntity from "../../models/entity/service-record-entity";

export default class ServiceRecordApiController extends AbstractApiController implements IController {
    private serviceRecordResource: ServiceRecordResource;

    constructor() {
        super();

        this.serviceRecordResource = new ServiceRecordResource();

    }


    public async getHandler(res: Response, req: Request): Promise<void> {
        const id = req.params.id;

        if (!this.isCorrectId(id)) {
            this.sendErrorMessageJson(res, 'Invalid id');

            return
        }

        const serviceRecordDb = await this.serviceRecordResource.getServiceRecordById(id);

        if (!this.isCorrectData(serviceRecordDb)) {
            this.sendErrorMessageJson(res, 'No serviceRecordDb', 200);

            return;
        }

        const serviceRecord = ServiceRecordConverter.convertDbServiceRecord(serviceRecordDb);

        this.sendData<ServiceRecordEntity>(res, serviceRecord);
    }

    public async postHandler(res: Response, req: Request): Promise<void> {
        let params = req.body;

        try {
            await this.serviceRecordResource.addNewServiceRecord(params);

            this.sendMessageJson(res, 'Ok');
        } catch (err) {
            this.sendErrorMessageJson(res, 'Bad request', 400);

            return;
        }
    }

    public async putHandler(res: Response, req: Request) {
        const id = req.params.id;
        const params = {...req.body, id}

        if (!this.isCorrectId(id)) {
            this.sendErrorMessageJson(res, 'Invalid id');

            return;
        }

        const serviceRecordDb = await this.serviceRecordResource.getServiceRecordById(id);

        if (!this.isCorrectData(serviceRecordDb)) {
            this.sendErrorMessageJson(res, 'This id not found', 200);

            return;
        }

        try {
            await this.serviceRecordResource.editServiceRecordById(params);

            this.sendMessageJson(res, 'Ok');
        } catch (err) {
            this.sendErrorMessageJson(res, 'Bad request', 400);
        }
    }

    public async deleteHandler(res: Response, req: Request) {
        const id = req.params.id;

        if (!this.isCorrectId(id)) {
            this.sendErrorMessageJson(res, 'Invalid id');

            return;
        }

        const serviceRecordDb = await this.serviceRecordResource.getServiceRecordById(id);

        if (!this.isCorrectData(serviceRecordDb)) {
            this.sendErrorMessageJson(res, 'This id not found', 200);

            return;
        }

        try {
            await this.serviceRecordResource.deleteServiceRecord(id);

            this.sendMessageJson(res, 'Ok');
        } catch (err) {
            this.sendErrorMessageJson(res, 'Bad request', 400);
        }
    }
}