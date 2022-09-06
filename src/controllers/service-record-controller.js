import ServiceRecordView from '../views/service-record-view.js';

export default class ServiceRecordController {
    execute(req, res, next) {
        const serviceRecordView = new ServiceRecordView();

        res.render(serviceRecordView.getTemplate(), { 'this': serviceRecordView });
    }
}