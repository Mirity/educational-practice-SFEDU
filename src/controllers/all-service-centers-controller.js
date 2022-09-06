import ServiceCentersView from '../views/service-centers-view.js';

export default class ServiceCentersController {
    execute(req, res, next) {
        const serviceCentersView = new ServiceCentersView();

        res.render(serviceCentersView.getTemplate(), { 'this': serviceCentersView });
    }
}