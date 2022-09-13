import ServiceRecordController from "../controllers/service-record-controller.js";
import AllServiceRecordsController from "../controllers/all-service-records-controller.js";
import AbstractRouter from "./abstract-router.js";

const serviceRecordController = new ServiceRecordController();
const allServiceRecordsController = new AllServiceRecordsController();

const routes = [
    {
        controller: serviceRecordController,
        path: '/service-record'
    },
    {
        controller: allServiceRecordsController,
        path: '/service-records'
    },
]

export default class ServiceRecordRouter extends AbstractRouter {
    constructor() {
        super(routes);
        this.isPost = true;

        this.createRoutes(this.isPost);
    }
}