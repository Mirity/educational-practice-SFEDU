import ServiceCentersView from '../views/service-centers-view.js';
import AbstractController from "./abstract-controller.js";
import ServiceCenterResource from "../models/resource/service-center-resource.js";

export default class ServiceCentersController extends AbstractController {
    async getHandler (res, req) {
        const serviceCenterResource = new ServiceCenterResource();
        const serviceCenters = await serviceCenterResource.getServiceCenters();

        const serviceCentersView = new ServiceCentersView();
        serviceCentersView.setServiceCenters(serviceCenters);

        this.render(res, serviceCentersView, req.session.isLoggedIn)

    }
}