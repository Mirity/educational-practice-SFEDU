import ServiceCenterView from '../views/service-center-view.js';
import ServiceCenterResource from "../models/resource/service-center-resource.js";

export default class ServiceCenterController {
    async execute(req, res, next) {

        if (req.method === 'GET') {
            await this.#getHandler(res, req);
        } else {
            await this.#postHandler(res, req);
        }
    }

    async #getHandler (res, req) {
        const serviceCenterResource = new ServiceCenterResource();
        const id = req.query.id;

        if (!id || Number.isInteger(id) || id <= 0) {
            res.status(500)
                .send(`No id provided or id incorrect`);

            return;
        }
        const serviceCenter = serviceCenterResource.getServiceCenterById(id);

        const serviceCenterView = new ServiceCenterView();
        serviceCenterView.setServiceCenter(serviceCenter)

        res.render(serviceCenterView.getTemplate(), { 'this': serviceCenterView });
    }

    async #postHandler (res, req) {
        const serviceCenterResource = new ServiceCenterResource();
        await serviceCenterResource.postServiceCenter(req);

        res.redirect('/service-centers');
    }
}