import express from 'express';
import CarController from "../controllers/car-controller.js";
import AllCarsController from "../controllers/all-cars-conroller.js";

const carController = new CarController();
const allCarsController = new AllCarsController();


export default class CarRouter {
    constructor() {
        this.router = express.Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get(`/car`, carController.execute);
        this.router.get(`/cars`, allCarsController.execute.bind(allCarsController));
    }

    getRouter() {
        return this.router;
    }
}