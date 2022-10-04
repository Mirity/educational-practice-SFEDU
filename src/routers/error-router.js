import ErrorController from "../controllers/error-controller.js";
import AbstractRouter from "./abstract-router.js";


const errorController = new ErrorController();

const routes = [
    {
        controller: errorController,
        path: '/error',
        method: 'get'
    },
]

export default class ErrorRouter extends AbstractRouter {
    constructor() {
        super(routes);
        this.createRoutes();
    }
}