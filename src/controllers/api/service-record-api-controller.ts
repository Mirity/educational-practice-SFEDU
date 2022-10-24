import AbstractApiController from "./abstract-api-controller.js";
import { IController } from "../../abstracts/common";
import {Request, Response} from "express";
import ServiceRecordResource from "../../models/resource/service-record-resource.js";
import ServiceRecordConverter from "../../converters/service-record-converter.js";

export default class ServiceRecordApiController extends AbstractApiController implements IController {
    public async getHandler(res: Response, req: Request): Promise<void> {
        const serviceRecordResource = new ServiceRecordResource();
        const id = req.params.id;

        if (!this.isCorrectId(id)) {
            this.sendMessageJson(res, 'Invalid id', 500);

            return
        }

        const serviceRecordDb = await serviceRecordResource.getServiceRecordById(id);

        if (!this.isCorrectData(serviceRecordDb)) {
            this.sendMessageJson(res, 'No serviceRecordDb');

            return;
        }

        const serviceRecord = ServiceRecordConverter.convertDbServiceRecord(serviceRecordDb);

        this.sendData(res, serviceRecord);
    }

    public async postHandler(res: Response, req: Request): Promise<void> {
        let params = req.body;

        const serviceRecordResource = new ServiceRecordResource();

        try {
            await serviceRecordResource.addNewServiceRecord(params);
        } catch (err) {
            this.sendMessageJson(res, 'Bad request', 400);
            console.log(err);
            return;
        }

        this.sendMessageJson(res, 'Ok');
    }

    public async putHandler(res: Response, req: Request) {
        let params = req.body;
        const id = req.params.id;
        params = {...params, id: id}

        if (!this.isCorrectId(id)) {
            this.sendMessageJson(res, 'Invalid id', 500);

            return;
        }

        const serviceRecordResource = new ServiceRecordResource();
        const serviceRecordDb = await serviceRecordResource.getServiceRecordById(id);

        if (!this.isCorrectData(serviceRecordDb)) {
            this.sendMessageJson(res, 'This id not found');

            return;
        }

        try {
            await serviceRecordResource.editServiceRecordById(params);
        } catch (err) {
            this.sendMessageJson(res, 'Bad request', 400);

            return;
        }

        this.sendMessageJson(res, 'Ok');
    }

    public async deleteHandler(res: Response, req: Request) {
        const id = req.params.id;

        if (!this.isCorrectId(id)) {
            this.sendMessageJson(res, 'Invalid id', 500);

            return;
        }

        const serviceRecordResource = new ServiceRecordResource();
        const serviceRecordDb = await serviceRecordResource.getServiceRecordById(id);

        if (!this.isCorrectData(serviceRecordDb)) {
            this.sendMessageJson(res, 'This id not found');

            return;
        }

        try {
            await serviceRecordResource.deleteServiceRecord(id);
        } catch (err) {
            this.sendMessageJson(res, 'Bad request', 400);

            return;
        }

        this.sendMessageJson(res, 'Ok');
    }
}