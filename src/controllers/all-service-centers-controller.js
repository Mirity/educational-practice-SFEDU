import ServiceCentersView from '../views/service-centers-view.js';
import Database from "../database.js";
import AbstractController from "./abstract-controller.js";

export default class ServiceCentersController extends AbstractController {
    async execute(req, res, next) {
        await super.execute(req, res, next);
    }

    async getHandler (res) {
        const serviceCenters = await Database.makeQuery(`SELECT service_center.id, service_center.name, street, house, number_seats, country.name AS country_name, city.name AS city_name FROM service_center JOIN country ON country.id = service_center.country_id JOIN city ON city.id = service_center.city_id GROUP BY service_center.id;
`);

        const serviceCentersView = new ServiceCentersView();
        serviceCentersView.setServiceCenters(serviceCenters);

        res.render(serviceCentersView.getTemplate(), { 'this': serviceCentersView });
    }
}