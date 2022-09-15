import ServiceCenterView from '../views/service-center-view.js';
import ServiceCenterResource from "../models/resource/service-center-resource.js";
import AbstractController from "./abstract-controller.js";

export default class ServiceCenterController extends AbstractController {
  async getHandler (res, req) {
        const serviceCenterResource = new ServiceCenterResource();
        const id = req.query.id;

        if(!this.idHandler(id, res)) {
            return;
        }
        const serviceCenter = serviceCenterResource.getServiceCenterById(id);

        const serviceCenterView = new ServiceCenterView();
        serviceCenterView.setServiceCenter(serviceCenter)

        res.render(serviceCenterView.getTemplate(), { 'this': serviceCenterView });
    }

    async postHandler (res, req) {
        const params = req.body;

        const serviceCenterResource = new ServiceCenterResource();
        await serviceCenterResource.addNewServiceCenter(params);

        res.redirect('/service-centers');
    }
}