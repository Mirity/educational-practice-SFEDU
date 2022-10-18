import ServiceCentersView from '../views/service-centers-view.js';
import AbstractController from "./abstract-controller.js";
import ServiceCenterResource from "../models/resource/service-center-resource.js";
import ServiceCenterConverter from "../converters/service-center-converter.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";


export default class ServiceCentersController extends AbstractController implements IController {
    public async getHandler (res: Response, req: Request): Promise<void> {
        const serviceCenterResource = new ServiceCenterResource();
        const serviceCentersDb = await serviceCenterResource.getServiceCenters();

        const serviceCentersView = new ServiceCentersView();
        serviceCentersView
            .setServiceCenters(ServiceCenterConverter.convertDbServiceCenters(serviceCentersDb))
            .setCsrfToken(req.session.csrfToken);

        this.render(res, serviceCentersView, req.session.isLoggedIn)
    }
}