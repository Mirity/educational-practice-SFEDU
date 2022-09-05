import express from 'express';
import MasterController from '../controllers/master-controller.js';
import AllMastersController from "../controllers/all-masters-controller.js";

const masterController = new MasterController();
const mastersController = new AllMastersController();

export default class MasterRouter {
    constructor() {
        this.router = express.Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get(`/master`, masterController.execute);
        this.router.get(`/masters`, mastersController.execute);
    }

    getRouter() {
        return this.router;
    }
}