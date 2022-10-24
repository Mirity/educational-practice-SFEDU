import AbstractRouter from "../abstract-router.js";
import { IRouter, Route } from "../../abstracts/common";
import { RequestMethod } from "../../abstracts/common.js"
import ServiceCenterApiController from "../../controllers/api/service-center-api-controller.js";
import ServiceCentersApiController from "../../controllers/api/service-centers-api-controller.js";


const serviceCenterApiController = new ServiceCenterApiController();
const serviceCentersApiController = new ServiceCentersApiController();

const routes: Route[] = [
    {
        controller: serviceCenterApiController,
        path: '/api/service-centers/:id',
        method: RequestMethod.get
    },
    {
        controller: serviceCenterApiController,
        path: '/api/service-centers',
        method: RequestMethod.post
    },
    {
        controller: serviceCentersApiController,
        path: '/api/service-centers',
        method: RequestMethod.get
    },
    {
        controller: serviceCenterApiController,
        path: '/api/service-centers/:id',
        method: RequestMethod.put
    },
    {
        controller: serviceCenterApiController,
        path: '/api/service-centers/:id',
        method: RequestMethod.delete
    },
]

export default class ServiceCenterApiRouter extends AbstractRouter implements IRouter {
    constructor() {
        super(routes);
        this.createRoutes();
    }
}