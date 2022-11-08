import AbstractApiController from "./abstract-api-controller.js";
import { IController } from "../../abstracts/common";
import { Request, Response } from "express";
import ServiceCenterProvider from "../../models/provider/service-center-provider.js";
import {ServiceCenter} from "../../abstracts/service-center";

export default class ServiceCenterApiController extends AbstractApiController implements IController {
    private serviceCenterProvider: ServiceCenterProvider;

    constructor() {
        super();

        this.serviceCenterProvider = new ServiceCenterProvider();
    }

    public async getHandler(res: Response, req: Request): Promise<void> {
        const id = req.params.id;

        if (!this.isCorrectId(id)) {
            this.sendErrorMessageJson(res, 'Invalid id');

            return
        }

        try {
            const serviceCenter = await this.serviceCenterProvider.getServiceCenterById(id);

            this.sendData<ServiceCenter>(res, serviceCenter);
        } catch (err: any) {
            this.sendErrorMessageJson(res, err.message, 404);
        }

    }

    public async postHandler(res: Response, req: Request): Promise<void> {
        let params = req.body;

        try {
            await this.serviceCenterProvider.postServiceCenter(params);

            this.sendMessageJson(res, 'Ok');
        } catch (err: any) {
            this.sendErrorMessageJson(res, err.message, 400);
        }
    }

    public async putHandler(res: Response, req: Request) {
        const id = req.params.id;
        const params = {...req.body, id}

        try {
            await this.serviceCenterProvider.putServiceCenter(params);

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
            await this.serviceCenterProvider.deleteServiceCenter(id);

            this.sendMessageJson(res, 'Ok');
        } catch (err: any) {
            this.sendErrorMessageJson(res, err.message, 400);
        }
    }
}