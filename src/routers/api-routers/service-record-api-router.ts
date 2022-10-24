import AbstractRouter from "../abstract-router.js";
import { IRouter, Route } from "../../abstracts/common";
import { RequestMethod } from "../../abstracts/common.js"
import ServiceRecordApiController from "../../controllers/api/service-record-api-controller.js";
import ServiceRecordsApiController from "../../controllers/api/service-records-api-controller.js";

const serviceRecordApiController = new ServiceRecordApiController();
const serviceRecordsApiController = new ServiceRecordsApiController();

const routes: Route[] = [
    {
        controller: serviceRecordApiController,
        path: '/api/service-records/:id',
        method: RequestMethod.get
    },
    {
        controller: serviceRecordApiController,
        path: '/api/service-records',
        method: RequestMethod.post
    },
    {
        controller: serviceRecordsApiController,
        path: '/api/service-records',
        method: RequestMethod.get
    },
    {
        controller: serviceRecordApiController,
        path: '/api/service-records/:id',
        method: RequestMethod.put
    },
    {
        controller: serviceRecordApiController,
        path: '/api/service-records/:id',
        method: RequestMethod.delete
    },
]

export default class ServiceRecordApiRouter extends AbstractRouter implements IRouter {
    constructor() {
        super(routes);
        this.createRoutes();
    }
}