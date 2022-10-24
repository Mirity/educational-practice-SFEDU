import AbstractApiController from "./abstract-api-controller.js";
import { IController } from "../../abstracts/common";
import { Request, Response } from "express";
import ServiceCenterResource from "../../models/resource/service-center-resource.js";
import ServiceCenterConverter from "../../converters/service-center-converter.js";

export default class ServiceCentersApiController extends AbstractApiController implements IController {
    public async getHandler(res: Response, req: Request): Promise<void> {
        const serviceCenterResource = new ServiceCenterResource();

        const serviceCentersDb = await serviceCenterResource.getServiceCenters();

        if(!this.isCorrectData(serviceCentersDb)) {
            this.sendMessageJson(res, 'No serviceCentersDb');

            return;
        }

        const serviceCenters = ServiceCenterConverter.convertDbServiceCenters(serviceCentersDb);

        this.sendData(res, serviceCenters);
    }
}