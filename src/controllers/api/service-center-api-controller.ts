import AbstractApiController from "./abstract-api-controller.js";
import { IController } from "../../abstracts/common";
import { Request, Response } from "express";
import ServiceCenterResource from "../../models/resource/service-center-resource.js";
import ServiceCenterConverter from "../../converters/service-center-converter.js";

export default class ServiceCenterApiController extends AbstractApiController implements IController {
    public async getHandler(res: Response, req: Request): Promise<void> {
        const serviceCenterResource = new ServiceCenterResource();
        const id = req.params.id;

        if (!this.isCorrectId(id)) {
            this.sendMessageJson(res, 'Invalid id', 500);

            return
        }

        const serviceCenterDb = await serviceCenterResource.getServiceCenterById(id);

        if (!this.isCorrectData(serviceCenterDb)) {
            this.sendMessageJson(res, 'No serviceRecordDb');

            return;
        }

        const serviceCenter = ServiceCenterConverter.convertDbServiceCenter(serviceCenterDb);

        this.sendData(res, serviceCenter);
    }

    public async postHandler(res: Response, req: Request): Promise<void> {
        let params = req.body;

        const serviceCenterResource = new ServiceCenterResource();

        try {
            await serviceCenterResource.addNewServiceCenter(params);
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

        const serviceCenterResource = new ServiceCenterResource();
        const serviceCenterDb = await serviceCenterResource.getServiceCenterById(id);

        if (!this.isCorrectData(serviceCenterDb)) {
            this.sendMessageJson(res, 'This id not found');

            return;
        }

        try {
            await serviceCenterResource.editServiceCenter(params);
        } catch (err) {
            this.sendMessageJson(res, 'Bad request', 400);
            console.log(err)
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

        const serviceCenterResource = new ServiceCenterResource();
        const serviceCenterDb = await serviceCenterResource.getServiceCenterById(id);

        if (!this.isCorrectData(serviceCenterDb)) {
            this.sendMessageJson(res, 'This id not found');

            return;
        }

        try {
            await serviceCenterResource.deleteServiceCenter(id);
        } catch (err) {
            this.sendMessageJson(res, 'Bad request', 400);

            return;
        }

        this.sendMessageJson(res, 'Ok');
    }
}