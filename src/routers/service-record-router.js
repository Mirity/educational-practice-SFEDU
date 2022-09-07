import express from 'express';
import ServiceRecordController from "../controllers/service-record-controller.js";
import AllServiceRecordsController from "../controllers/all-service-records-controller.js";
import AbstractRouter from "./abstract-router.js";

const serviceRecordController = new ServiceRecordController();
const allServiceRecordsController = new AllServiceRecordsController();

export default class ServiceRecordRouter extends AbstractRouter{
    constructor() {
        super();
        super.routes = [
            {
                'controller': serviceRecordController,
                'path': '/service_record'
            },
            {
                'controller': allServiceRecordsController,
                'path': '/service_records'
            },
        ]

        this.createRoutes()
    }
}