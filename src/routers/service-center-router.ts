import ServiceCenterController from "../controllers/service-center-controller.js";
import AllServiceCentersController from "../controllers/all-service-centers-controller.js";
import AbstractRouter from "./abstract-router.js";
import { IRouter, Route } from "../abstracts/common";
import { RequestMethod } from "../abstracts/common.js";


const serviceCenterController = new ServiceCenterController();
const allServiceCentersController = new AllServiceCentersController();

const routes: Route[] = [
    {
        controller: serviceCenterController,
        path: '/service-center',
        method: RequestMethod.get
    },
    {
        controller: serviceCenterController,
        path: '/service-center',
        method: RequestMethod.post
    },
    {
        controller: allServiceCentersController,
        path: '/service-centers',
        method: RequestMethod.get
    },
]

export default class ServiceCenterRouter extends AbstractRouter implements IRouter {
    constructor() {
        super(routes);

        this.createRoutes();
    }
}