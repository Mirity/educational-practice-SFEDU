import ServiceCentersView from '../views/service-centers-view.js';
import AbstractController from "./abstract-controller.js";
import ServiceCenterResource from "../models/resource/service-center-resource.js";

export default class ServiceCentersController extends AbstractController {
    async getHandler (res) {
        const serviceCenterResource = new ServiceCenterResource();
        const serviceCenters = serviceCenterResource.getServiceCenters();

        const serviceCentersView = new ServiceCentersView();
        serviceCentersView.setServiceCenters(serviceCenters);

        res.render(serviceCentersView.getTemplate(), { 'this': serviceCentersView });
    }
}