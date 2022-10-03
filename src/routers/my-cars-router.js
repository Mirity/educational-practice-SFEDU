import MyCarsController from "../controllers/my-cars-controller.js";
import AbstractRouter from "./abstract-router.js";


const myCarsController = new MyCarsController();

const routes = [
    {
        controller: myCarsController,
        path: '/my-cars',
        method: 'get'
    },
]

export default class MyCarsRouter extends AbstractRouter {
    constructor() {
        super(routes);
        this.createRoutes();
    }
}