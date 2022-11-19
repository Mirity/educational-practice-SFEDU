import ServiceRecordController from "../controllers/service-record-controller.js";
import AllServiceRecordsController from "../controllers/all-service-records-controller.js";
import AbstractRouter from "./abstract-router.js";
import DeleteServiceRecordController from "../controllers/delete-service-record-controller.js";
import { IRouter, Route } from "../abstracts/common";
import { RequestMethod } from "../abstracts/common.js";


const serviceRecordController = new ServiceRecordController();
const allServiceRecordsController = new AllServiceRecordsController();
const deleteServiceRecordController = new DeleteServiceRecordController();

const routes: Route[] = [
    {
        controller: serviceRecordController,
        path: '/service-record',
        method: RequestMethod.get
    },
    {
        controller: serviceRecordController,
        path: '/my-records',
        method: RequestMethod.post
    },
    {
        controller: allServiceRecordsController,
        path: '/service-records',
        method: RequestMethod.get
    },
    {
        controller: deleteServiceRecordController,
        path: '/delete-service-record',
        method: RequestMethod.get
    },
]

export default class ServiceRecordRouter extends AbstractRouter implements IRouter {
    constructor() {
        super(routes);

        this.createRoutes();
    }
}