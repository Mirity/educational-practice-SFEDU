import CarController from "../controllers/car-controller.js";
import AllCarsController from "../controllers/all-cars-conroller.js";
import AbstractRouter from "./abstract-router.js";

const carController = new CarController();
const allCarsController = new AllCarsController();

const routes = [
    {
        controller: carController,
        path: '/car'
    },
    {
        controller: allCarsController,
        path: '/cars'
    },
]

export default class CarRouter extends AbstractRouter{
    constructor() {
        super(routes);

        this.createRoutes()
    }
}