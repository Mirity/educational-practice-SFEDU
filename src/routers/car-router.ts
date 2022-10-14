import CarController from "../controllers/car-controller.js";
import AllCarsController from "../controllers/all-cars-conroller.js";
import AbstractRouter from "./abstract-router.js";
import OldCarsController from "../controllers/old-cars-controller.js";
import EditCarController from "../controllers/edit-car-controller.js";
import { Route } from "../abstracts/common";

const carController = new CarController();
const allCarsController = new AllCarsController();
const oldCarsController = new OldCarsController();
const editCarController = new EditCarController()

const routes: Route[] = [
    {
        controller: carController,
        path: '/car',
        method: 'post'
    },
    {
        controller: carController,
        path: '/car',
        method: 'get'
    },
    {
        controller: allCarsController,
        path: '/cars',
        method: 'get'
    },
    {
        controller: oldCarsController,
        path: '/old-cars',
        method: 'get'
    },
    {
        controller: editCarController,
        path: '/edit-car',
        method: 'get'
    },
    {
        controller: editCarController,
        path: '/edit-car',
        method: 'post'
    },

]

export default class CarRouter extends AbstractRouter {
    constructor() {
        super(routes);
        this.createRoutes();
    }
}