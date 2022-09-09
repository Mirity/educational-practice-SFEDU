import express from 'express';
import ServiceRecordController from "../controllers/service-record-controller.js";
import AllServiceRecordsController from "../controllers/all-service-records-controller.js";
import AbstractRouter from "./abstract-router.js";

const serviceRecordController = new ServiceRecordController();
const allServiceRecordsController = new AllServiceRecordsController();

const routes = [
    {
        controller: serviceRecordController,
        path: '/service_record'
    },
    {
        controller: allServiceRecordsController,
        path: '/service_records'
    },
    {
        controller: allServiceRecordsController,
        path: '/add_service_record'
    },
]

export default class ServiceRecordRouter extends AbstractRouter{
    constructor() {
        super(routes);

        this.createRoutes();
        this.createPostQuery();
    }
}