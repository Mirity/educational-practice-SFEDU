import ServiceCenterController from "../controllers/service-center-controller.js";
import AllServiceCentersController from "../controllers/all-service-centers-controller.js";
import AbstractRouter from "./abstract-router.js";

const serviceCenterController = new ServiceCenterController();
const allServiceCentersController = new AllServiceCentersController();

const routes = [
    {
        controller: serviceCenterController,
        path: '/service-center',
        method: 'get'
    },
    {
        controller: serviceCenterController,
        path: '/service-center',
        method: 'post'
    },
    {
        controller: allServiceCentersController,
        path: '/service-centers',
        method: 'get'
    },
]

export default class ServiceCenterRouter extends AbstractRouter {
    constructor() {
        super(routes);
        this.isPost = true;

        this.createRoutes(this.isPost);
    }
}