import ServiceRecordsView from '../views/service-records-view.js';

export default class ServiceRecordsController {
    execute(req, res, next) {
        const serviceRecordsView = new ServiceRecordsView();

        res.render(serviceRecordsView.getTemplate(), { 'this': serviceRecordsView });
    }
}