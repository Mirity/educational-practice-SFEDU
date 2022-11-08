import AbstractApiController from "./abstract-api-controller.js";
import { IController } from "../../abstracts/common";
import { Request, Response } from "express";
import ServiceCenterProvider from "../../models/provider/service-center-provider.js";
import { ServiceCenter } from "../../abstracts/service-center";

export default class ServiceCentersApiController extends AbstractApiController implements IController {
    private serviceCenterProvider: ServiceCenterProvider;

    constructor() {
        super();

        this.serviceCenterProvider = new ServiceCenterProvider();
    }


    public async getHandler(res: Response, req: Request): Promise<void> {
        try {
            const serviceCenters = await this.serviceCenterProvider.getServiceCenters();

            this.sendData<ServiceCenter[]>(res, serviceCenters);
        } catch (err: any) {
            this.sendErrorMessageJson(res, err.message);
        }
    }
}