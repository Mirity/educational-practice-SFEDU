import ServiceCenterView from '../views/service-center-view.js';
import ServiceCenterResource from "../models/resource/service-center-resource.js";
import AbstractController from "./abstract-controller.js";

export default class ServiceCenterController extends AbstractController {
  async getHandler (res, req) {
        const serviceCenterResource = new ServiceCenterResource();
        const id = req.query.id;

        if (!this.isCorrectId(id)) {
            return this.handleInvalidId(res);
        }

        const serviceCenter = await serviceCenterResource.getServiceCenterById(id);

        const serviceCenterView = new ServiceCenterView();
        serviceCenterView.setServiceCenter(serviceCenter)

        this.render(res, serviceCenterView, req.session.isLoggedIn)
  }

    async postHandler (res, req) {
        let params = req.body;

        if(!this.verifyCsrfToken(params.csrf_token, req.session.csrfToken)) {
            return this.redirectToError(res, 'Отказано в доступе');
        }

        params = this.handleParamsXss(params)

        const serviceCenterResource = new ServiceCenterResource();
        await serviceCenterResource.addNewServiceCenter(params);

        res.redirect('/service-centers');
    }
}