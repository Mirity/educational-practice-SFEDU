import express from 'express';
import ServiceCenterController from "../controllers/service-center-controller.js";
import AllServiceCentersController from "../controllers/all-service-centers-controller.js";

const serviceCenterController = new ServiceCenterController();
const allServiceCentersController = new AllServiceCentersController();


export default class ServiceCenterRouter {
    constructor() {
        this.router = express.Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get(`/service_center`, serviceCenterController.execute);
        this.router.get(`/service_centers`, allServiceCentersController.execute);
    }

    getRouter() {
        return this.router;
    }
}