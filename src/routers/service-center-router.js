import ServiceCenterController from "../controllers/service-center-controller.js";
import AllServiceCentersController from "../controllers/all-service-centers-controller.js";
import AbstractRouter from "./abstract-router.js";

const serviceCenterController = new ServiceCenterController();
const allServiceCentersController = new AllServiceCentersController();


export default class ServiceCenterRouter extends AbstractRouter{
    constructor() {
        super();
        super.routes = [
            {
                'controller': serviceCenterController,
                'path': '/service_center'
            },
            {
                'controller': allServiceCentersController,
                'path': '/service_centers'
            },
        ]

        this.createRoutes()
    }
}