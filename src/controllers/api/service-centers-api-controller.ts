import AbstractApiController from "./abstract-api-controller.js";
import { IController } from "../../abstracts/common";
import { Request, Response } from "express";
import ServiceCenterProvider from "../../models/provider/service-center-provider.js";
import {ServiceCenter} from "../../abstracts/service-center";

export default class ServiceCentersApiController extends AbstractApiController implements IController {
    public async getHandler(res: Response, req: Request): Promise<void> {
        const serviceCenterProvider = new ServiceCenterProvider();
        const serviceCenters = await serviceCenterProvider.getServiceCenters();

        if(!this.isCorrectData(serviceCenters)) {
            this.sendErrorMessageJson(res, 'No serviceCentersDb', 200);

            return;
        }

        try{
            this.sendData<ServiceCenter[]>(res, serviceCenters);
        } catch (err: any) {
            this.sendErrorMessageJson(res, err.message);
        }
    }
}