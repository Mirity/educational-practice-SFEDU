import ServiceRecordController from "../controllers/service-record-controller.js";
import AllServiceRecordsController from "../controllers/all-service-records-controller.js";
import AbstractRouter from "./abstract-router.js";
import DeleteServiceRecordController from "../controllers/delete-service-record-controller.js";
import { Route } from "../abstracts/common";

const serviceRecordController = new ServiceRecordController();
const allServiceRecordsController = new AllServiceRecordsController();
const deleteServiceRecordController = new DeleteServiceRecordController();

const routes: Route[] = [
    {
        controller: serviceRecordController,
        path: '/service-record',
        method: 'get'
    },
    {
        controller: serviceRecordController,
        path: '/service-record',
        method: 'post'
    },
    {
        controller: allServiceRecordsController,
        path: '/service-records',
        method: 'get'
    },
    {
        controller: deleteServiceRecordController,
        path: '/delete-service-record',
        method: 'get'
    },
]

export default class ServiceRecordRouter extends AbstractRouter {
    constructor() {
        super(routes);

        this.createRoutes();
    }
}