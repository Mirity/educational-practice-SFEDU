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
        path: '/car'
    },
    {
        controller: carController,
        path: '/car'
    },
    {
        controller: allCarsController,
        path: '/cars'
    },
    {
        controller: oldCarsController,
        path: '/old-cars'
    },
]

export default class CarRouter extends AbstractRouter {
    constructor() {
        super(routes);

        this.createRoutes();
    }
}