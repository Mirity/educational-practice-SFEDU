import ServiceCenterView from '../views/service-center-view.js';
import Database from "../database.js";

export default class ServiceCenterController {
    async execute(req, res, next) {
        const connection = Database.getConnection();

        const serviceCenter = await connection.awaitQuery(`select * from service_center where id = 1`);

        const serviceCenterView = new ServiceCenterView();
        serviceCenterView.setServiceCenter(serviceCenter)

        res.render(serviceCenterView.getTemplate(), { 'this': serviceCenterView });
    }
}