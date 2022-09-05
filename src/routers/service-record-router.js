import express from 'express';
import ServiceRecordController from "../controllers/service-record-controller.js";
import AllServiceRecordsController from "../controllers/all-service-records-controller.js";

const serviceRecordController = new ServiceRecordController();
const allServiceRecordsController = new AllServiceRecordsController();

export default class ServiceRecordRouter {
    constructor() {
        this.router = express.Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get(`/service_record`, serviceRecordController.execute);
        this.router.get(`/service_records`, allServiceRecordsController.execute);
    }

    getRouter() {
        return this.router;
    }
}