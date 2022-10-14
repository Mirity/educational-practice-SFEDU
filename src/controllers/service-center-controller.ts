import ServiceCenterView from '../views/service-center-view.js';
import ServiceCenterResource from "../models/resource/service-center-resource.js";
import AbstractController from "./abstract-controller.js";
import ServiceCenterConverter from "../converters/service-center-converter.js";
import { IController } from "../abstracts/common";

export default class ServiceCenterController extends AbstractController implements IController {
    public async getHandler (res: any, req: any): Promise<void>  {
        const serviceCenterResource = new ServiceCenterResource();
        const id = req.query.id;

        if (!this.isCorrectId(id)) {
            return this.handleInvalidId(res);
        }

        const serviceCenterDb = await serviceCenterResource.getServiceCenterById(id);

        if(serviceCenterDb === undefined) {
            return this.handleInvalidId(res);
        }

        const serviceCenterView = new ServiceCenterView();
        serviceCenterView.setServiceCenter(ServiceCenterConverter.convertDbServiceCenter(serviceCenterDb))

        this.render(res, serviceCenterView, req.session.isLoggedIn)
  }

    public async postHandler (res: any, req: any): Promise<void>  {
        let params = req.body;

        const serviceCenterResource = new ServiceCenterResource();
        await serviceCenterResource.addNewServiceCenter(params);

        res.redirect('/service-centers');
    }
}