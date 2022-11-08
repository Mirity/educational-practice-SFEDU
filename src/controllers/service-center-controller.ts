import ServiceCenterView from '../views/service-center-view.js';
import AbstractWebController from "./abstract-web-controller.js";
import ServiceCenterConverter from "../converters/service-center-converter.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";
import ServiceCenterProvider from "../models/provider/service-center-provider.js";



export default class ServiceCenterController extends AbstractWebController implements IController {
    private serviceCenterView: ServiceCenterView;
    private serviceCenterProvider: ServiceCenterProvider;

    constructor() {
        super();

        this.serviceCenterProvider = new ServiceCenterProvider();
        this.serviceCenterView = new ServiceCenterView();
    }

    public async getHandler (res: Response, req: Request): Promise<void>  {
        const id = req.query.id;

        if (!this.isCorrectId(id)) {
            return this.handleInvalidId(res);
        }


        try {
            const serviceCenter = await this.serviceCenterProvider.getServiceCenterById(id);

            this.serviceCenterView.setServiceCenter(ServiceCenterConverter.convertServiceCenterToEntity(serviceCenter))

            this.render(res, this.serviceCenterView, req.session.isLoggedIn)
        } catch (err: any) {
            this.redirectToError(res, err.message, 404);
        }
  }

    public async postHandler (res: Response, req: Request): Promise<void>  {
        let params = req.body;

        try {
            await this.serviceCenterProvider.postServiceCenter(params);

            res.redirect('/service-centers');

        } catch (err: any) {
            this.redirectToError(res, err.message, 400);
        }
    }
}