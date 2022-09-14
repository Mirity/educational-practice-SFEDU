import ServiceCenterView from '../views/service-center-view.js';
import ServiceCenterResource from "../models/resource/service-center-resource.js";
import AbstractController from "./abstract-controller.js";

export default class ServiceCenterController extends AbstractController {
    async execute(req, res, next) {
        await super.execute(req, res, next);
    }

    async getHandler (res, req) {
        const serviceCenterResource = new ServiceCenterResource();
        const id = req.query.id;
        super.isCorrectId(id, res);

        const serviceCenter = serviceCenterResource.getServiceCenterById(id);

        const serviceCenterView = new ServiceCenterView();
        serviceCenterView.setServiceCenter(serviceCenter)

        res.render(serviceCenterView.getTemplate(), { 'this': serviceCenterView });
    }

    async postHandler (res, req) {
        const queryParams = req.body;

        const serviceCenterResource = new ServiceCenterResource();
        await serviceCenterResource.addNewServiceCenter(queryParams);

        res.redirect('/service-centers');
    }
}