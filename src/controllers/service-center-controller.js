import ServiceCenterView from '../views/service-center-view.js';

export default class ServiceCenterController {
    execute(req, res, next) {
        const serviceCenterView = new ServiceCenterView();

        res.render(serviceCenterView.getTemplate(), { 'this': serviceCenterView });
    }
}