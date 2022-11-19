import CarController from "../controllers/car-controller.js";
import AllCarsController from "../controllers/all-cars-conroller.js";
import AbstractRouter from "./abstract-router.js";
import OldCarsController from "../controllers/old-cars-controller.js";
import EditCarController from "../controllers/edit-car-controller.js";
import { IRouter, Route } from "../abstracts/common";
import { RequestMethod } from "../abstracts/common.js";

const carController = new CarController();
const allCarsController = new AllCarsController();
const oldCarsController = new OldCarsController();
const editCarController = new EditCarController()

const routes: Route[] = [
    {
        controller: carController,
        path: '/my-cars',
        method: RequestMethod.post
    },
    {
        controller: carController,
        path: '/car',
        method: RequestMethod.get
    },
    {
        controller: allCarsController,
        path: '/cars',
        method: RequestMethod.get
    },
    {
        controller: oldCarsController,
        path: '/old-cars',
        method: RequestMethod.get
    },
    {
        controller: editCarController,
        path: '/edit-car',
        method: RequestMethod.get
    },
    {
        controller: editCarController,
        path: '/edit-car',
        method: RequestMethod.post
    },

]

export default class CarRouter extends AbstractRouter implements IRouter {
    constructor() {
        super(routes);
        this.createRoutes();
    }
}