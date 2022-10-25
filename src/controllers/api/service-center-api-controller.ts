import AbstractApiController from "./abstract-api-controller.js";
import { IController } from "../../abstracts/common";
import { Request, Response } from "express";
import ServiceCenterResource from "../../models/resource/service-center-resource.js";
import ServiceCenterConverter from "../../converters/service-center-converter.js";
import ServiceCenterEntity from "../../models/entity/service-center-entity";

export default class ServiceCenterApiController extends AbstractApiController implements IController {
    private serviceCenterResource: ServiceCenterResource;

    constructor() {
        super();

        this.serviceCenterResource = new ServiceCenterResource();
    }
    public async getHandler(res: Response, req: Request): Promise<void> {
        const id = req.params.id;

        if (!this.isCorrectId(id)) {
            this.sendErrorMessageJson(res, 'Invalid id');

            return
        }

        const serviceCenterDb = await this.serviceCenterResource.getServiceCenterById(id);

        if (!this.isCorrectData(serviceCenterDb)) {
            this.sendErrorMessageJson(res, 'No serviceRecordDb', 200);

            return;
        }

        const serviceCenter = ServiceCenterConverter.convertDbServiceCenter(serviceCenterDb);

        this.sendData<ServiceCenterEntity>(res, serviceCenter);
    }

    public async postHandler(res: Response, req: Request): Promise<void> {
        let params = req.body;

        try {
            await this.serviceCenterResource.addNewServiceCenter(params);

            this.sendMessageJson(res, 'Ok');
        } catch (err) {
            this.sendErrorMessageJson(res, 'Bad request', 400);
        }
    }

    public async putHandler(res: Response, req: Request) {
        const id = req.params.id;
        const params = {...req.body, id}

        if (!this.isCorrectId(id)) {
            this.sendErrorMessageJson(res, 'Invalid id', 500);

            return;
        }

        const serviceCenterDb = await this.serviceCenterResource.getServiceCenterById(id);

        if (!this.isCorrectData(serviceCenterDb)) {
            this.sendErrorMessageJson(res, 'This id not found', 200);

            return;
        }

        try {
            await this.serviceCenterResource.editServiceCenter(params);

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

        const serviceCenterDb = await this.serviceCenterResource.getServiceCenterById(id);

        if (!this.isCorrectData(serviceCenterDb)) {
            this.sendErrorMessageJson(res, 'This id not found', 200);

            return;
        }

        try {
            await this.serviceCenterResource.deleteServiceCenter(id);

            this.sendMessageJson(res, 'Ok');
        } catch (err) {
            this.sendErrorMessageJson(res, 'Bad request', 400);
        }
    }
}