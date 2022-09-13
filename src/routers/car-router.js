import CarController from "../controllers/car-controller.js";
import AllCarsController from "../controllers/all-cars-conroller.js";
import AbstractRouter from "./abstract-router.js";
import OldCarsController from "../controllers/old-cars-controller.js";

const carController = new CarController();
const allCarsController = new AllCarsController();
const oldCarsController = new OldCarsController();

const routes = [
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
]

export default class CarRouter extends AbstractRouter {
    constructor() {
        super(routes);
        this.createRoutes();
    }
}