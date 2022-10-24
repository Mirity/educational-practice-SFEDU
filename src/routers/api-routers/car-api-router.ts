import AbstractRouter from "../abstract-router.js";
import { IRouter, Route } from "../../abstracts/common";
import { RequestMethod } from "../../abstracts/common.js"
import CarApiController from "../../controllers/api/car-api-controller.js";
import CarsApiController from "../../controllers/api/cars-api-controller.js";

const carsApiController = new CarsApiController();
const carApiController = new CarApiController();

const routes: Route[] = [
    {
        controller: carApiController,
        path: '/api/cars/:id',
        method: RequestMethod.get
    },
    {
        controller: carApiController,
        path: '/api/cars',
        method: RequestMethod.post
    },
    {
        controller: carsApiController,
        path: '/api/cars',
        method: RequestMethod.get
    },
    {
        controller: carApiController,
        path: '/api/cars/:id',
        method: RequestMethod.put
    },
    {
        controller: carApiController,
        path: '/api/cars/:id',
        method: RequestMethod.delete
    },
]

export default class CarApiRouter extends AbstractRouter implements IRouter {
    constructor() {
        super(routes);
        this.createRoutes();
    }
}