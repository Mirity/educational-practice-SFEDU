import ServiceCentersView from '../views/service-centers-view.js';
import AbstractWebController from "./abstract-web-controller.js";
import ServiceCenterConverter from "../converters/service-center-converter.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";
import ServiceCenterProvider from "../models/provider/service-center-provider.js";
import { ServiceCenter } from "../abstracts/service-center";


export default class ServiceCentersController extends AbstractWebController implements IController {
    private serviceCentersView: ServiceCentersView;

    constructor() {
        super();

        this.serviceCentersView = new ServiceCentersView();
    }

    public async getHandler (res: Response, req: Request): Promise<void> {
        const serviceCenterProvider = new ServiceCenterProvider();
        let serviceCenters: ServiceCenter[];

        try {
            serviceCenters = await serviceCenterProvider.getServiceCenters();

            this.serviceCentersView
                .setServiceCenters(ServiceCenterConverter.convertServiceCentersToEntities(serviceCenters))
                .setCsrfToken(req.session.csrfToken);

            this.render(res, this.serviceCentersView, req.session.isLoggedIn)
        } catch (err: any) {
            this.redirectToError(res, err.message)
        }
    }
}