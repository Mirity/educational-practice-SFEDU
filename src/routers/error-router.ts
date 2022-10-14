import ErrorController from "../controllers/error-controller.js";
import AbstractRouter from "./abstract-router.js";
import { Route } from "../abstracts/common";


const errorController = new ErrorController();

const routes: Route[] = [
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